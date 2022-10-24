
const login = async (req, res) => {

    req.session.user = req.body.userName

    console.log("req.session post login", req.session.user)

    try {    
        res.send({status: "OK", userName: req.body.userName})

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

export {login, logout}