const router = require("express").Router();
const Loan = require("../Models/Loan");
const Group = require("../Models/Group");
const User = require("../Models/User");
const UserWallet = require("../Models/UserWallet")




router.post("/createLoan/:groupId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group)
      return res.status(404).json({
        message: "you must be a member of a group in order to apply for a loan",
      });
    if (!group.members.includes(req.body.userId)) {
      return res.status({
        message:
          "you can only apply for a loan under a group for which you are a member.",
        success: false,
      });
    }
    const newLoan = new Loan(req.body);
    const savedLoan = newLoan.save();

    if (!group.loans.includes(savedLoan._id)) {
      return await group.updateOne({ $push: { loans: savedLoan._id } });
    }

    return res
      .status(200)
      .json({ message: "Loan created successfully", success: true });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get all the  loans




router.get("/loans", verifyTokenAndAdmin, async (req, res) => {
  try {
    const loans = await Loan.find();
    return res.status(200).json(loans);
  } catch (err) {
    return res.status(500).json(err);
  }
});



//find all the loans for a specific group




router.get("/loans/:groupId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) res.status(404).json({ message: "group does not exist" });

    return res.status(200).json(loans);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
