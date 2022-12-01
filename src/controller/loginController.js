import { mailOptions, transporter } from "../utils/nodemailer.js"

const login = async (req, res) => {

    req.session.user = req.body.username

    console.log("req.session post login", req.session.user)
    console.log("así queda la session", req.session)

    req.session.save()    
    console.log("ID DE LA SESSION", req.sessionID)

    try {    
        res.send(req.session)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const loginError = async (req, res) => {

    try {    
        res.send({status: "ERROR", message: 'Invalid credentials'})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const logout = async (req, res) => {
  
    try {
        req.session.destroy()     
        console.log("sesión destruida") 
        res.send({message: "sesión cerrada"})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const register = async (req, res) => {

  console.log("desde register", req.session)
  console.log("desde register", req.body)
    
  try {
      req.session.user = req.body.username
      
      if(req.body.existingUser) {
        res.send({status: "NO_OK", message: "El usuario ya existe"})
      } else {

        mailOptions.html = `<h1>Nuevo usuario registrado con los siguientes datos:</h1>
        <p>
            <ul style="color: blue">User: ${req.session.user}</ul>
            <ul style="color: blue">User Id: ${req.session.userId}</ul>
            <ul style="color: blue">First Name: ${req.session.firstName}</ul>
            <ul style="color: blue">Last Name: ${req.session.lastName}</ul>
            <ul style="color: blue">Email: ${req.session.email}</ul>
            <ul style="color: blue">Phone Number: ${req.session.phoneNumber}</ul>
        </p>`
        
        await transporter.sendMail(mailOptions)
        res.send({status: "OK", username: req.body.username})
      }

  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }
}

const registerError = async (req, res) => {

    try {    
        res.send({status: "ERROR", message: 'user already exists'})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export {login, logout, register, loginError, registerError}