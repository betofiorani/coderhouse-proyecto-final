import express from "express";
import { environment } from "./src/environment/environment.js";
import productRouter from "./src/router/productRouter.js";
import chatRouter from "./src/router/chatRouter.js";
import templateRouter from "./src/router/templateRouter.js";
import shoppingCartRouter from "./src/router/shoppingCartRouter.js";

import path from 'path';
import { fileURLToPath } from 'url';
import {Server as ServerIO} from 'socket.io'
import { Server as HttpServer } from 'http'

const app = express()
const httpServer = new HttpServer(app);

httpServer.listen(environment.PORT, () => {
  console.log(`Server listening on Port: ${environment.PORT}`)
})

const io = new ServerIO(httpServer)

io.on('connection', socket => {
  console.log("conectado", socket.id)
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

// ejs
app.set('views', path.join(__dirname,'./src/views'))
app.set('view engine', 'ejs')

app.use('/api/productos', productRouter)
app.use('/api/carrito', shoppingCartRouter)
app.use('/api/chat', chatRouter)
app.use('/api/template', templateRouter)

