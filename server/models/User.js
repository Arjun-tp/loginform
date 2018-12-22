const mongoose = require('mongoose');
const { Schema } = mongoose;
let elasticSearch = require('elasticsearch');
let elasticClient = require('../server')

const userSchema = new Schema ({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    age : {
        type : Number,
    },
    occupation : {
        type : String,
    }
},
{timestamps : true})


try{

    userSchema.post('save', (doc)=>{
        console.log("log00000000000000",doc);
        
        elasticClient.client.index({
            index : 'users',
            id :doc._id.toString(),
            type : "users",
            body : {
                firstName : doc.firstName,
                lastName : doc.lastName,
                email : doc.email,
                lastName : doc.lastName

            }
        },(err,resp,status) =>{
            console.log("response====",resp);
            console.log("response====",status);
        })
    })

    

}catch(e){
    console.log(e);
}

module.exports = mongoose.model("user",userSchema)