const mongoose = require('mongoose')
const configDB = async()=>{
    try{
        const db = await mongoose.connect('mongodb+srv://shaikrahid2001:HPsQQya3BEVIXAnh@cluster0.pvbeb3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('server is connected to db');

    }
    catch(err){
        console.log('err connecting to db',err)
    }


}
module.exports = configDB;
