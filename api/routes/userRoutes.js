const express = require('express');
const router = express.Router();
const {handleUserRegistration, handleUserLogin, handleUserVerification, handleUserLogout} = require('../controllers/userController');

router.post('/register', handleUserRegistration);
router.post('/login', handleUserLogin);
router.get('/verify', handleUserVerification);
router.get('/logout', handleUserLogout);

module.exports = router;