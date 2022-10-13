const admin = true

const validAdmin = async (req, res, next) =>{
    if(admin){
        next()
    } else {
        res.send({
            error: -1,
            descripcion: "Este usuario no tiene los permisos para realizar esta operacion"
        })
    }
}

const loginMiddleware = (req, res, next) => {

    console.log("request", req.session.user)

    if(!req.session.user) {
        res.send({
            error: -1,
            descripcion: "Este usuario no tiene los permisos para realizar esta operación"
        })
    } else {
        console.log(`Ingreso el usuario ${req.session.user}`)
        return next()
    }
}

export {validAdmin, loginMiddleware}