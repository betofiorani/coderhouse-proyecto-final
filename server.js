import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from "cors";
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import {Server as ServerIO} from 'socket.io'
import { Server as HttpServer } from 'http'
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import { environment } from "./src/environment/environment.js";
import productRouter from "./src/router/productRouter.js";
import loginRouter from "./src/router/loginRouter.js";
import registerRouter from "./src/router/registerRouter.js";
import chatRouter from "./src/router/chatRouter.js";
import templateRouter from "./src/router/templateRouter.js";
import shoppingCartRouter from "./src/router/shoppingCartRouter.js";
import productFakerRouter from "./src/router/productFakerRouter.js";
import { hashPassword, isValidPassword } from './src/utils/bcryptPasswords.js'
import User from "./src/model/User.js";
import yargs from 'yargs'
import infoRouter from "./src/router/infoRouter.js";
import randomRouter from "./src/router/randomRouter.js";
import cluster from 'cluster';
import os from 'os';

const cpus = os.cpus()

const yargsOptions = yargs(process.argv.slice(2))

const args = yargsOptions.alias({
  p: "port",
  m: 'mode'
}).default({
  port: 8080,
  mode: 'fork'
}).argv

console.log("Modo de inicio de servidor: ", args.m)

//const PORT = args.port

const isCluster= args.m == 'cluster'

if(isCluster && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork()
  })
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })
} else {

  const app = express()
  const httpServer = new HttpServer(app);
 
  httpServer.listen(environment.PORT, '0.0.0.0', () => {
    console.log(`Server listening on Port: ${environment.PORT}`)
  })

  // CONFIGURAR CORS
  const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_ALTERNATIVE, "*"]
  const corsOptions = {
    origin: function(origin, callback){
      
      if(whitelist.includes(origin)){
        // puede conectarse
        callback(null, true)
      }
      else {
        // no puede conectarse
        callback(new Error("Error de cors"))
      }
    },
    credentials: true,
  }

  app.use(cors(corsOptions))

  const io = new ServerIO(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
  })


  //Configuracion session
  const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: environment.MONGO_STRING_CONNECTION_SESSION,
        mongoOptions,
      }),
      secret: environment.SECRET_SESSION,
      name: 'beto-coder',
      resave: false,
      saveUninitialized: true,
      rolling: true, //ACA LO QUE HACEMOS ES DECIRLE QUE NOS RENUEVE EL TIEMPO DE EXPIRACION DE LA SESION CON CADA REQUEST
      cookie: {
        secure: true,
        httpOnly: false,
        sameSite: 'none',
        maxAge: 120000,
      },
    })
  )

  io.on('connection', socket => {
    console.log(`???: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('????: A user disconnected');
    });
    socket.emit('connection', "conectado")
  })

  //Statics

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.static(`${__dirname}/public`))

  app.use((req, res, next) => {
    req.io = io;
    return next();
  });

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  //middleware de aplicacion passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Estrategia de registro
  const registerStrategy = new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
        try {
            const existingUser = await User.findOne({ username })
            
            if(existingUser){
              
              req.body.existingUser = true
              return done(null, existingUser)
            } else {

              const newUser = {
                  username,
                  password: hashPassword(password),
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  celular: req.body.celular,
                  age: req.body.age *1,
                  avatar: req.body.avatar
              }
              console.log("Nuevo usuario creado: ",newUser)
  
              const createdUser = await User.create(newUser)
              done(null, createdUser)
            }

        } catch (error) {
            console.log("Error registrando usuario", error)
            done("Error en registro", null)
        }
    }
  )

  // Estrategia de logueo
  const loginStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username })
            if(!user || !isValidPassword(password, user.password)){
                return done(null, null)
            }

            done(null, user)
            
        } catch (error) {
            console.log("Error login", err);
            done("Error login", null);
        }
    }
  )
  //------------------------------------------------

  passport.use("register", registerStrategy);
  passport.use("login", loginStrategy);

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });


  // ejs
  app.set('views', path.join(__dirname,'./src/views'))
  app.set('view engine', 'ejs')

  app.use('/api/productos', productRouter)
  app.use('/api/productos-test',productFakerRouter)
  app.use('/api/carrito', shoppingCartRouter)
  app.use('/api/chat', chatRouter)
  app.use('/api/login', loginRouter)
  app.use('/api/register', registerRouter)
  app.use('/api/template', templateRouter)
  app.use('/api/info', infoRouter)
  app.use('/api/randoms', randomRouter)

}
export { args }