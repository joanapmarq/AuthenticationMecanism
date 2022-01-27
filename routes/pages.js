const express = require('express');
const { verify } = require('../controllers/auth');

const router = express.Router();
router.get('/', (req,res) => {
    res.render('index');
});

router.get('/register', (req,res) => {
    res.render('register');
});

router.get('/login', (req,res) => {
    res.render('login');
});

router.post('/login', (req,res) => {
    res.render('index');
});

module.exports = router;

