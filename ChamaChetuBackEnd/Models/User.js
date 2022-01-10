const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    idNo:{
        type:Number,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    gender:{
        type:String,
        required:true,
        
    },
    groups:{
        type:Array,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    },
    trusts:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilePicture:{
        type:String
    },
    resetLink:{
        type:String
    }
   

} ,  { timestamps: true }, { collection: "users" })

module.exports = mongoose.model("User", UserSchema)