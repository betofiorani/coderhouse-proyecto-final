import { normalizedMessages } from '../utils/normalize.js'
import ChatDaoMongo from '../DAO/chat/ChatDaoMongo.js'

const chat = ChatDaoMongo.getInstance()

const getAllMessages = async (req, res) => {
  const {io} = req
  try {
      const messages = await chat.getAll()
      
      const normalizedChat = normalizedMessages(messages)

      io.sockets.emit("server:messages",normalizedChat)   
      res.send(normalizedChat)
      
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }
}

const newMessage = async (req, res) => {
  const {io} = req
  try {
      let messages = await chat.create(req.body)

      const allMessages = await chat.getAll()
      const normalizedChat = normalizedMessages(allMessages)

      io.sockets.emit("server:messages",normalizedChat)

      res.send(messages)
      
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }
}

export {getAllMessages, newMessage}