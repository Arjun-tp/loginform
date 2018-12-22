let Register = require('../models/Register')
let User = require('../models/User')

let bcrypt = require('bcrypt');


async function loginAutentication() {     //parameters coming from frontend(email)
    console.log("==============================================");
    
let emailId = "arjun@gmail.com"
let passCode = "spartacusBlood998"
    try{
        let findUser = await Register.findOne({email : emailId});
        console.log("findUser===========",findUser);

        if(findUser && findUser.encryptPass){
            let comparePass = await bcrypt.compare(passCode, findUser.encryptPass)
            console.log("findUser===========",comparePass);
        }
    }catch(e){
        console.log("e-------",e);
    }
}


module.exports.loginAutentication = loginAutentication;