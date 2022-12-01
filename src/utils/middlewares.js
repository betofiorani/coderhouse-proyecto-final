const admin = true

const loginMiddleware = (req, res, next) => {

    console.log("request", req.session.user)
    console.log("request", req.session)
    console.log("ID", req.sessionID)

    if(!req.session.user && admin === false) {
        res.send({
            error: -1,
            descripcion: "Este usuario no tiene los permisos para realizar esta operación"
        })
    } else {
        console.log(`Ingreso el usuario ${req.session.user}`)
        return next()
    }
}

export {loginMiddleware}