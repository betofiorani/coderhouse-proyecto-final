import dao from '../DAO/index.js'

const chat = dao.ChatDao

const getAllMessages = async (req, res) => {
  const {io} = req
  try {
      const messages = await chat.getAll()
      
      io.sockets.emit("server:messages",messages)   
      res.render('home.ejs', {mensajes: messages})
      
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }
}

const newMessage = async (req, res) => {
  try {
      let messages = await chat.save(req)
      //res.send(products)
      res.redirect('/api/productos')
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }
}

export {getAllMessages, newMessage}