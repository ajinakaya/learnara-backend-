const express = require('express');
const router = express.Router();
const AuthValidation = require('../validation/authvalidation');
const {registerUser,
        loginUser,
        forgetPassword,
        resetPassword
        } = require('../controller/authController')

//Authentication routes
router.post('/register',AuthValidation, registerUser)
router.post('/login', loginUser)
router.post('/forgetpassword', forgetPassword);
router.post('/resetpassword', resetPassword);

module.exports = router;