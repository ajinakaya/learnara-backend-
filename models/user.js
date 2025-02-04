const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    username:{
       type: String,
       require:true
    },
    email: {
        type:String,
        unique:true
    },
    password: {
      type:String,
      require:true
 
    },
    image: {
        type: String,
        default: null,
      },
    role: {
        type: String,
        enum: ['user', 'admin'],  
        default: 'user',
    },
});

const UserModel = mongoose.model("User",userSchema);
module.exports=UserModel;