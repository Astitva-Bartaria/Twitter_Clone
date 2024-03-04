const mongoose = require('mongoose');

const dbConnect = ()=>{
    mongoose.connect(process.env.URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{console.log('CONNECTED TO DATABASE')})
    .catch((err)=>{console.log(err)})
}

module.exports = dbConnect;