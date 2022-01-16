const jwt = require("jsonwebtoken")


const createActivationToken = (payload)=>{
   return jwt.sign(
        payload,process.env.JWT_SECRET_PHRASE,{
            expiresIn:"10m"
        }
    )

}