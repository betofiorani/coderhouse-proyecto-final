import fs from "fs"

const path = "./archivos/"

class Chat {
  constructor(fileName){
    this.fileName = fileName
  }
  save = async req => {
    console.log("desde save",this.fileName)
    const {userEmail, message} = req.body

    try{

        console.log("prueba1",fs.existsSync(`${path}${this.fileName}`))

        const messages = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        console.log("desde try catch", messages)
        const date = new Date()
        const date_formated = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        const newMessage = {userEmail,message,date: date_formated}

        messages.push(newMessage)
        
        console.log("messages")

        await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(messages, null, "\t"))
        
        return newMessage
        
    } 
    catch(error) {
        console.log(`Ocurrió un error al guardar el producto. El error es: ${error}`)
    }
  } 
  
  getAll = async () => {

    try {      
      const messages = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
      return messages
    } 
    catch (error) {
        console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
    }

  }
}

export default Chat