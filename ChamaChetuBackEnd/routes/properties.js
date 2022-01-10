const router = require("express").Router();
const Property = require("../Models/Property");
const { body, validationResult } = require("express-validator");
const {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin
} = require("./verificationToken");

router.post(
  "/",

  body("email").isEmail().withMessage("email is invalid"),
  body("email").notEmpty().withMessage("email required"),
  body("name").notEmpty().withMessage("name is required"),
  body("message").notEmpty().withMessage("message is required"),

  async (req, res) => {
    //validation ofcreation of property errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //create a new group property
  const newProperty = new Property(req.body)
    try {
      const savedProperty = await newProperty.save();
      res.status(200).json(savedProperty);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

//delete one property  in the database

router.delete("/:id", async (req, res) => {
  try {
    const deleteProperty = await Property.findByIdAndDelete(req.params.id);
    res.status(200).json("Property deleted successfully!");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//view all the properties

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const properties = await Property.find();
    if (!properties) {
      res.status(404).json("No propertiesare being tracked currently");
    }
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json(err);
  }
});

//view properties of one group
router.get("/group/:groupId", async (req, res) => {
    try {
      const properties = await Property.find({groupId:req.params.groupId});
      if (!properties) {
        res.status(404).json("This group is not tracking any properties yet");
      }
      res.status(200).json(properties);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//view one property

router.get("/:id", async (req, res) => {
  try {
    const property = await property.findById(req.params.id);
    if (!property) {
      res.status(404).json("That property does not exist!");
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
