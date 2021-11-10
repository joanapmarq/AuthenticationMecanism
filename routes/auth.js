const express = require('express');
const authController = require ('../controllers/auth');

const router = express.Router();

//post  method http - get data from the form
router.post('/register', authController.register)

router.get('/verify', authController.verify)

router.post('/login', authController.login)

module.exports = router;

