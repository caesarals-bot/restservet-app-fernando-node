const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/config')

class Server {
      
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        //Conectar a base de datos
        this.conectarDb()
        //Middleware: añaden otras funcionalidades al web server
        this.middlewares()
        //Rutas
        this.routes()
    }

    async conectarDb() {
        await dbConnection()
    }

    middlewares(){
        //Cors
        this.app.use( cors())
        // Lectura y parseo del body
        this.app.use( express.json() )
        //directorio publico
        this.app.use( express.static('public'))
    }

    routes(){
       this.app.use(this.usersPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

module.exports = Server;