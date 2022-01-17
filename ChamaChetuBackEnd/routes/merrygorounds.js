const router = require("express").Router()
const Group = require("../Models/Group")
const Merrygoround = require("../Models/Merrygoround")
const User = require("../Models/User")

//create a merryGoRound
router.post("/:groupId", async(req,res)=>{
     try{
        const group = await Group.findById(req.params.groupId)
        if(!group){
            return res.status(200).json({ success:false, message:"The group does not exist"})

        }
        const {interval,contributionAmountPerMember} = req.body
        const newMerryGoRound = new Merrygoround({
            interval:req.body.interval,
            contributionAmountPerMember:req.body.contributionAmountPerMember,
            groupId:group._id,
            members:group.members,
                    });
        const savedMerryGoRound = await newMerryGoRound.save();
      
        return res.status(200).json({message:"The merry-go-round has been created successfully",success:true, data:savedMerryGoRound})
    }
    catch(err){
        return res.status(500).json(err)

    }
})

//start a merry go round
router.put("/start/:merrygoroundId", async(req,res)=>{
    try{
        const group = await Group.findById(req.body.groupId)
        const merrygoround = await Merrygoround.findById(req.params.merrygoroundId);
        if(!merrygoround){
            return res.status(404).json({message:"Merry-go-round not found"})
        }
         await merrygoround.updateOne({isStarted:true,isOngoing:true,startDate:Date.now()},{new:true})
       console.log(merrygoround)
        
       
        if(!group.onGoingMerryGoRounds.includes(req.params.merrygoroundId)){
            await group.updateOne({ $push: { onGoingMerryGoRounds: merrygoround._id } });
        }
        return res.status(200).json({message:"The merry-go-round has been started successfully",success:true,data:merrygoround,})
      }

    catch(err){
        return res.status(500).json(err)
    }
       
})
//get the current beneficiary in the members array
router.get("/currentbeneficiary/:merrygoroundId" , async(req,res)=>{

    
    try{
    //find the merrygoround
    const merrygoround = await Merrygoround.findById(req.params.merrygoroundId)
    if(merrygoround) return  res.status(404).json("no merry go round with such an id")
     const members = merrygoround.members
     let currentbeneficiary

     if(merrygoround.interval === "daily"){
         
function ArrayPlusDelay(array, delegate, delay) {
    var i = 0
    
     // seed first call and store interval (to clear later)
    var interval = setInterval(function() {
          // each loop, call passed in function
        delegate(array[i]);
        
          // increment, and if we're past array, clear interval
        if (i++ >= array.length - 1)
            clearInterval(interval);
    }, delay)
    
    return interval 
  }
  
  var inter = ArrayPlusDelay(members, function(obj) {
    currentbeneficiary = obj
    console.log(`current beneficiary is ${currentbeneficiary}`)
  },3000)

     }
     else if(merrygoround.interval === "weekly"){
                  
function ArrayPlusDelay(array, delegate, delay) {
    var i = 0
    
     // seed first call and store interval (to clear later)
    var interval = setInterval(function() {
          // each loop, call passed in function
        delegate(array[i]);
        
          // increment, and if we're past array, clear interval
        if (i++ >= array.length - 1)
            clearInterval(interval);
    }, delay)
    
    return interval 
  }
  
  var inter = ArrayPlusDelay(members, function(obj) {
    currentbeneficiary = obj
    console.log(`current beneficiary is ${currentbeneficiary}`)
  },6000)


     }
     else{
                  
function ArrayPlusDelay(array, delegate, delay) {
    var i = 0
    
     // seed first call and store interval (to clear later)
    var interval = setInterval(function() {
          // each loop, call passed in function
        delegate(array[i]);
        
          // increment, and if we're past array, clear interval
        if (i++ >= array.length - 1)
            clearInterval(interval);
    }, delay)
    
    return interval 
  }
  
  var inter = ArrayPlusDelay(members, function(obj) {
    currentbeneficiary = obj
    console.log(`current beneficiary is ${currentbeneficiary}`)
  },9000)

     }
     const CurrBeneficiary = await User.findById(currentbeneficiary)

     return res.status(200).json({success:true,data:CurrBeneficiary})
    }
    catch(err){
        return res.status(500).json(err)
    }
            //find the members of the specific group then 

    //update current beneficiary

})

//view a merry go round for a specific group
 router.get("/group/:merrygoroundId", async(req,res)=>{

    try{

        const merrygoround = await Merrygoround.findById(req.params.merrygoroundId);
        if(!merrygoround){
            return res.status(401).json({message:"No merry go round with such id"})
        }
        if(merrygoround.groupId !== req.body.groupId ){
            return res.status(401).json({message:"wrong group id"})

        }
        return res.status(200).json({success:true,data:merrygoround})
        


    }
    catch(err){
        return res.status(500).json(err)

    }

})



//view one merrygoround






//find all the  ongoing contributions for a group


//find 








module.exports = router