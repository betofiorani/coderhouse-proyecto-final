import { args } from "../../server.js"

const getInfo = async (req, res) => {
    const info = {
        puerto: args.port,
        plataforma: process.platform,
        versionNode: process.version,
        memoriaTotalReservada: process.memoryUsage().rss,
        pathExec: process.execPath,
        processId: process.pid,
        carpetaProyecto: process.cwd()
    }
    res.send({info})
}

export { getInfo }