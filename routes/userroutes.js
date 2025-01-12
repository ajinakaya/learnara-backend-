const express = require('express');
const router = express.Router();
const AuthValidation = require('../validation/authvalidation');
const {  findAllUsers,
         findUserById,
         updateUser,
         deleteUser } = require('../controller/userController')

          router.get('/users', findAllUsers);  
          router.get('/users/:id',findUserById); 
          router.put('/users/:id',AuthValidation, updateUser);  
          router.delete('/users/:id',deleteUser);  


module.exports = router;