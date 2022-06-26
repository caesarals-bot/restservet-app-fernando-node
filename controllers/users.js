const { response } = require("express")
const bcryptjs = require('bcryptjs')

const User = require('../models/user')
const user = require("../models/user")

const usersGet = async(req, res = response) => {
    // const {q, nombre = 'No name', apiKey} = req.query
    const {limite = 5, desde = 0} = req.query
    const query = {estado: true}
    // const users = await User.find(query)//filtramos usuarios borrados
    //     .skip(desde)
    //     .limit(limite)
    
    // const total = await User.countDocuments(query)

    const [total, users]= await Promise.all([
        User.countDocuments(query),//total de usuarios base de datos
        User.find(query)//filtramos usuarios borrados
        .skip(desde)
        .limit(limite)
    ])
    res.json({
        total,
        users
        // total,
        // users
    })
}
const usersPost = async (req, res) => {
    
    const {nombre, correo, password, rol} = req.body
    const user = new User({nombre, correo, password, rol})
    //Encriptar la contraseña 
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync( password, salt)
    //guardar en dataBase
    await user.save()
    res.json({
        user
    })
}
const usersPut = async(req, res = response) => {
    const {id} = req.params
    const { _id, password, google, ...resto } = req.body
    
    //TODO validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync( password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto)
    res.json({
        msg: 'Put API Desde controlador',
        user
    })
}
const usersPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API Desde controlador'
    })
}
const usersDelete = async(req, res = response) => {

    const {id} = req.params
    //Borrar fisicamente
    // const usuario = await user.findByIdAndDelete(id)

    //Cambiar el estado del usuario
    const usuario = await user.findByIdAndUpdate(id, {estado: false})

    res.json({
        usuario
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}