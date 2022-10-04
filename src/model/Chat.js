import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true },
})

const Chat = mongoose.model("Chat", chatSchema)

export default Chat