const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
} = require("./verificationToken");
const Group = require("../Models/Group");
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");

//create a group

router.post(
  "/create",
  body("groupname").notEmpty().withMessage("A group needs a name"),
  body("description").notEmpty().withMessage("description is required"),
  // verifyTokenAndAuthorisation,
  async (req, res) => {
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newGroup = new Group(req.body);

    try {
      const savedGroup = await newGroup.save();
      res.status(200).json(savedGroup);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//update one group

router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedGroup);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete one group

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    return res.status(200).json("group successfully deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get one group

router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json("group does not exist");
    }

    return res.status(200).json(group);
  } catch (err) {
    return res.status(500).json(err);
  }
});
//get all the groups
router.get("/get", verifyTokenAndAdmin, async (req, res) => {
  try {
    const groups = await Group.find();
    if (!groups) {
      return res.status(404).json("No groups were found!");
    }

    return res.status(200).json(groups);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get all the members of one group
router.get("/members/:groupId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    let groupmembers = await Promise.all(
      group.members.map((_id) => {
        return User.findById(_id);
      })
    );

    let memberList = [];
    groupmembers.map((groupmember) => {
      const { _id, username, email, phone, groups } = groupmember;
      // memberList.push({username,email });
      console.log(username, email);
      memberList.push({ _id, username, email, phone, groups });
    });

    if (memberList.length == 0) {
      res.status(200).json("This group has no members");
    }
    res.status(200).json(memberList);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get chairperson of a group

router.get("/chairperson/:groupId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "group does not exist" });
    }
    const chairperson = group.chairPerson;
    if (!chairperson) {
      return res.status(404).json("No chairPerson for this group yet");
    } else {
      const userChairPerson = await User.findById(chairperson);
    }
    return res.status(200).json(groupChairPerson);
  } catch (err) {
    return res.status(500).json(err);
  }
});
//add a user to a group

router.put("/:groupId/addmember", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json("user not found");
    }
    if (!group.members.includes(req.body.userId)) {
      await group.updateOne({ $push: { members: req.body.userId } });
      await user.updateOne({ $push: { groups: req.params.groupId } });
      return res.status(200).json({
        message: `user successfully added to ${group.groupname}`,
      });
    } else {
      res.status(403).json("User is already a member of this group");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//remove a user from a group
router.put("/:groupId/removemember", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const group = await Group.findById(req.params.groupId);
    if (group.members.includes(req.body.userId)) {
      await group.updateOne({ $pull: { members: req.body.userId } });
      await user.updateOne({ $pull: { groups: req.params.groupId } });
      res.status(200).json("user has been successfully removed from the group");
    } else {
      res.status(403).json("User is not a member of this group");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
