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

export {validAdmin}