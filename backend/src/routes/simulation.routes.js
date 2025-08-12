const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const { runSimulation, history } = require('../controllers/simulation.controller')

const router = Router()

router.use(auth)
router.post('/', runSimulation)
router.get('/history', history)

module.exports = router




