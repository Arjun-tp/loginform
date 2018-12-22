const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginSchema = new Schema ({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    encryptPass : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    }
},
{timestamps : true})
    




module.exports = mongoose.model("login",loginSchema)