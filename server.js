import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from "cors";
import MongoStore from 'connect-mongo';

import path from 'path';
import { fileURLToPath } from 'url';
import {Server as ServerIO} from 'socket.io'
import { Server as HttpServer } from 'http'

import { environment } from "./src/environment/environment.js";
import productRouter from "./src/router/productRouter.js";
import loginRouter from "./src/router/loginRouter.js";
import chatRouter from "./src/router/chatRouter.js";
import templateRouter from "./src/router/templateRouter.js";
import shoppingCartRouter from "./src/router/shoppingCartRouter.js";
import productFakerRouter from "./src/router/productFakerRouter.js";


const app = express()
const httpServer = new HttpServer(app);

httpServer.listen(environment.PORT, () => {
  console.log(`Server listening on Port: ${environment.PORT}`)
})

const io = new ServerIO(httpServer, {
  cors: {
      origin: "http://localhost:3000"
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
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true, //ACA LO QUE HACEMOS ES DECIRLE QUE NOS RENUEVE EL TIEMPO DE EXPIRACION DE LA SESION CON CADA REQUEST
    cookie: {
      secure: false,
      maxAge: 120000,
    },
  })
)

io.on('connection', socket => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
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

// ejs
app.set('views', path.join(__dirname,'./src/views'))
app.set('view engine', 'ejs')

app.use('/api/productos', productRouter)
app.use('/api/productos-test',productFakerRouter)
app.use('/api/carrito', shoppingCartRouter)
app.use('/api/chat', chatRouter)
app.use('/api/login', loginRouter)
app.use('/api/template', templateRouter)
