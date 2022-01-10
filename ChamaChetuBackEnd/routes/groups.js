const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
} = require("./verificationToken");
const Group = require("../Models/Group");
const { body, validationResult } = require("express-validator");

//create a group

router.post(
  "/create",
  body("groupname").notEmpty().withMessage("A group needs a name"),
  body("groupname").isEmail().withMessage("Invalid Email"),
  body("groupname").notEmpty().withMessage("name required"),
  body("groupname").isEmail().withMessage("Invalid Email"),
  body("groupname").notEmpty().withMessage("name required"),
  verifyTokenAndAuthorisation,
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

router.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const deleteGroup = await Group.findByIdAndDelete(req.params.id);
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

module.exports = router;
