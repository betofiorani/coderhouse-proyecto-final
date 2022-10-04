import dotenv from "dotenv"

dotenv.config()

export const environment = {
  PORT: process.env.PORT || 8080,
  DATABASE: process.env.DATABASE || "mongodb", // mongodb | firebase | fyleSystem
  MONGO_STRING_CONNECTION: process.env.MONGO_STRING_CONNECTION,
  FIREBASE_SECRET_KEY: process.env.FIREBASE_SECRET_KEY
}