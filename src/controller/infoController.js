import os from 'os'

const getInfo = async (req, res) => {
    const { args } = req
    const info = {
        puerto: args.port,
        plataforma: process.platform,
        versionNode: process.version,
        memoriaTotalReservada: process.memoryUsage().rss,
        pathExec: process.execPath,
        processId: process.pid,
        carpetaProyecto: process.cwd(),
        cantCPUs: os.cpus().length
    }
    res.send({info})
}

export { getInfo }