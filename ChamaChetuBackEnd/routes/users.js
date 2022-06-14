const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
} = require("./verificationToken");
const User = require("../Models/User");
const CryptoJS = require("crypto-js");

//update one user

router.put("/user/:id", verifyTokenAndAuthorisation, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PHRASE
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete one user

router.delete("/user/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("user successfully deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get one user

router.get("/user/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("user does not exist");
    }
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});
//get all the users
router.get("/users", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json("No users");
    }

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//find the groups that the user belongs to

router.get("/:userId/groups", async(req,res)=>{

  try{
    const user = await User.findById(req.params.id)
    if(!user){
      return res.status(404).json({message:"user does not exist"})
    }
    const groups = await Promise.all(
      user.groups.map((groupId) => {
        return User.findById(groupId);
      })
    );
    let groupList = [];
    groups.map((group) => {
      const { _id, groupname} =group;
      memberList.push({ _id, groupname});
    });
    if (groupList.length == 0) {
      res.status(200).json("You have not joined any groups yet");
    }
    res.status(200).json(groupList);

  }
  catch(err){
    res.status(500).json(err)
  }
})


//get user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();

  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json(data);

    if (!data) {
      return res.status(404).json("no users found");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});


//trust a user



//mistrust a user

module.exports = router;
