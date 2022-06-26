const Rol = require('../models/rol')
const user = require('../models/user')

const esRolValido = async(rol='') => {
    const exitsRol = await Rol.findOne({ rol })
    if( !exitsRol ) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}
//verificar si el correo existe
const emailExists = async (correo='') =>{
     const email = await user.findOne({correo})
     if(email){      
        throw new Error( `el correo: ${correo} ya esta registrado`) 
     }
 }
const userExistsID = async (id) =>{
     const userId = await user.findById(id)
     if(!userId){      
        throw new Error( `el ID: ${id} no existe`) 
     }
 }
module.exports = {
    esRolValido,
    emailExists,
    userExistsID
}