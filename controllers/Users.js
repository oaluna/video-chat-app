

//Importing Model
const User=require('../models/Users.js')

const getAllUsers =((req,res)=>{
    res.send('you got the data')
})

module.exports={
    getAllUsers,
};