const router = require("express").Router()
const Feedback = require("../Models/Feedback")
const {body, validationResult} = require("express-validator")
const{ verifyToken , verifyTokenAndAuthorisation} = require("./verificationToken")

router.post("/" , 

body('email').isEmail().withMessage("email is invalid"),
body("email").notEmpty().withMessage("email required"),
body("name").notEmpty().withMessage("name is required"),
body("message").notEmpty().withMessage("message is required"),



async (req,res)=>{

//validation of feedback errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

//create a new feedback
    const newFeedback = new Feedback({
        name:req.body.name,
        email:req.body.email,
        message:req.body.password
    });

try{
    const savedFeedback = await newFeedback.save()
    res.status(200).json("Thank you for your feedback!")

}

catch(err){
    return res.status(500).json(err)
}

})


//delete all the feedbacks in the database


router.delete("/:id", async (req,res)=>{

    try{
        const deleteFeedback = await Feedback.findByIdAndDelete(req.params.id)
        res.status(200).json("Feedback deleted successfully!")
    }
    catch(err){
        return res.status(500).json(err)

    }
})


//view all the feedbacks

router.get("/", async (req,res)=>{
    try{
        const feedbacks = await Feedback.find()
        if(!feedbacks){
            res.status(404).json("No feedbacks yet")
        }
        res.status(200).json(feedbacks)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//view one feedback

router.get("/:id", async (req,res)=>{
    try{
        const feedback = await Feedback.findById(req.params.id)
        if(!feedback){
            res.status(404).json("No such feedback was found!")
        }
        res.status(200).json(feedback)
    }
    catch(err){
        res.status(500).json(err)
    }
})




module.exports = router