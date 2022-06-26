const {Router} = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { esRolValido, emailExists, userExistsID } = require('../helpers/db-validators')

const { 
    usersGet, 
    usersPut, 
    usersPost, 
    usersPatch,
    usersDelete 
} = require('../controllers/users')

const router = Router()

router.get('/', usersGet)
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistsID),
    check('rol').custom(esRolValido),
    validarCampos
], usersPut)
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
    check('password', 'El password debe de ser de 6 letras').isLength({ min:6}), 
    check('correo', 'El correo no es valido').isEmail().custom(emailExists), 
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
   
    check('rol').custom(esRolValido),
    validarCampos
], usersPost)
router.patch('/', usersPatch)
router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistsID),
    validarCampos
], usersDelete)

module.exports = router