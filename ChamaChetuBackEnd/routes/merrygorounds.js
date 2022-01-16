const router = require("express").Router()
const Group = require("../Models/Group")
const Merrygoround = require("../Models/Merrygoround")

//create a merryGoRound
router.post("/create/:groupId", async(req,res)=>{
    try{
        const group = await Group.findById(req.params.id)
        if(!group){
            return res.status(200).json({ success:false, message:"The group does not exist"})

        }
        const {interval,contributionAmountPerMember,interval} = req.body
        const newMerryGoRound = new Merrygoround(req.body);
        const savedMerryGoRound = await newMerryGoRound.save()
        return res.status(200).json({message:"The merry-go-round has been created successfully"})


    }
    catch(err){
        return res.status(500).json(err)

    }

})

//start a merry go round
router.post("/start/:merrygoroundId", async(req,res)=>{
    try{

        const group = await Group.findById(req.body.groupId)
        const merrygoround = await Merrygoround.findById(req.params.merrygoroundId);
        if(!merrygoround){
            return res.status(404).json({message:"Merry go round with that Id was not found"})
        }
        await merrygoround.UpdateOne({isStarted:true,startDate:Date.now()},{new:true})
        if(!group.onGoingMerryGoRounds.includes(req.params.merrygoroundId)){
            await group.updateOne({ $push: { onGoingMerryGoRounds: req.params.merrygoroundId } });
        }

        return res.status(200).json({message:"The merry-go-round has been started successfully"})
        


    }
    catch(err){
        return res.status(500).json(err)

    }

})

//view a merry go round for a specific group
router.get("/:merrygoroundId", async(req,res)=>{
    try{
        const merrygoround = await Merrygoround.findById(req.params.merrygoroundId);


    }
    catch(err){

    }

})



//finish a merrygoround




//find ongoing contributions for a group
router.post("/:groupId", async(req,res)=>{
    try{
        const 

    }
    catch(err){

    }

})









module.exports = router