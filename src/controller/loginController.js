
const login = async (req, res) => {

    req.session.user = req.body.username

    console.log("req.session post login", req.session.user)
    console.log("así queda la session", req.session)

    req.session.save()    

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

    req.session.user = req.body.username
    console.log("desde register", req.body)
    try {    
        res.send({status: "OK", username: req.body.username})

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