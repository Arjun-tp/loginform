let Register = require('../models/Register')
let User = require('../models/User')
let loginCredentialCheck = require('./loginCredentialCheck')

let bcrypt = require('bcrypt');

 async function register() {
    const saltRounds = 10;
    let registerParams = {
        firstName : "Arjun",
        lastName : "TP",
        email : "arjun@gmail.com",
        encryptPass : "spartacusBlood998"
    }

    try {
        let myHash = await bcrypt.hash(registerParams.encryptPass, saltRounds);
        registerParams.encryptPass = myHash; 
        let registerData = await Register.create(registerParams);
        console.log("registerData=========",registerData);

        if(registerData){
            let userParams = {
                firstName : "Arjun",
                lastName : "TP",
                email : "arjun@gmail.com",
                age : 21, 
                occupation : "DEAN"
            }
            let userDetails = await User.create(userParams);
            console.log("userDetails=========",userDetails);
            await loginCredentialCheck.loginAutentication()
            
        }
    }catch (e){
          console.log('err' + e)
    }

   
}




module.exports.register = register;