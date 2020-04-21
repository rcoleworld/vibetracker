const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController');

router.post('/createuser', loginController.createUser);
router.post('/login', loginController.login);
router.get('/getusers', loginController.getAllUsers);

module.exports = router