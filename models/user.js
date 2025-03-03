const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    username:{type:stringify,require:true},
    email:{type:stringify,require:true},
    password:{type:stringify,require:true}
})

module.exports=mongoose.model('User',UserSchema)