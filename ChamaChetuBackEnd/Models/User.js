const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:"name is required",
    },
    idnumber:{
        type:Number,
        
        unique:true
    },
    phone:{
        type:String,
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
       
        
    },
    groups:{
        type:Array, 
        default:[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    },
    isChairPerson:{
        type:Boolean,
        default:false,

    },
    chairForGroups:{
        type:Array,
        default:[]
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
    },
    isVerified:{
        type:Boolean,
        default:true
    }
   

} ,  { timestamps: true }, { collection: "users" })

module.exports = mongoose.model("User", UserSchema)