const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const controller = require('../controllers/driver.controller')

const router = Router()

router.use(auth)
router.get('/', controller.list)
router.get('/:id', controller.get)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router


