'use strict'

let express = require('express');
let expressRequest = express();
let mongoose = require('mongoose');
let elasticSearch = require('elasticsearch');
let config = require('./config/development');
let db = config.dbConfig.db
let registerDetails = require('./api/registerDetails')
const client = new elasticSearch.Client({
    hosts: ['http://localhost:9200']
})

client.ping({
    requestTimeout:30000,
},(err,res) =>{
    if(res){
        console.log("ELASTIC SERVER IS UP!")
    }else{
        console.log("ELASTIC SERVER IS DOWN!")
    }
})


var app = {
    config : config
}




mongoose.set("useCreateIndex", true)
mongoose.connection.on('connected', function () {
    console.log('channel connected -----');
    var port = process.env.PORT || 6010;
//    routes.register(router);
    // express.use('/api', router);
    expressRequest.listen(port);
    console.log('Server started successfully.. !!! Times- PORT - ' + port + '\n\n\n');
    registerDetails.register();
});

mongoose.connection.on('error', function (mongoError) {
    console.log(new Date() + ' @ MongoDB: ERROR connecting to: ' + 'mongodb://' + db.mongo.host + '/' + db.mongo.db + ' - ' + mongoError);
    // endProcess();
});

mongoose.connection.on('close', function () {
    console.log(new Date() + ' @ MongoDB: Connection Closed');
    console.log('DataBase down!! Please restart your DB and Server!!');
    // endProcess();
});
mongoose.connect('mongodb://' + db.mongo.host + ':' + db.mongo.port + '/' + db.mongo.mongo);





module.exports.client = client;
module.exports.default = app;