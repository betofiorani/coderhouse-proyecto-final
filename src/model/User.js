import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    celular: { type: String, required: true },
    age: { type: Number, required: true },
    avatar: { type: String, required: true },
    address: { type: String, required: true }
},{
  timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User