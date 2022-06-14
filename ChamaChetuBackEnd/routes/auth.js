const router = require("express").Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const CryptoJS = require("crypto-js");

//register
router.post(
  "/register",
  body("email").isEmail().withMessage("Invalid Email"),
  body("username").notEmpty().withMessage("name required"),
  body("idnumber").notEmpty().withMessage("id number is required"),
  body("email").notEmpty().withMessage("email required"),
  body("password").notEmpty().withMessage("password required"),
  body("phone").notEmpty().withMessage("phone required"),
  body("password").isLength({ min: 5 }).withMessage("Password too short!"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      idNo: req.body.id,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_PHRASE
      ).toString(),
    });

    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//login to online chama system
router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid Email"),
  body("email").notEmpty().withMessage("email required"),
  body("password").notEmpty().withMessage("password required"),
  body("password").isLength({ min: 5 }).withMessage("Password too short!"),

  async (req, res) => {
    // check for validattion errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //proceed to login the user if no errors were found
    try {
      //check if the user exists in the system

      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json("User does not exist");
      }
      //decrypt the passwoord

      const validPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_PHRASE
      );

      //convert password to string

      const pwd = validPassword.toString(CryptoJS.enc.Utf8);

      if (pwd !== req.body.password) {
        return res.status(401).json("wrong credentials");
      }
      const { password, ...others } = user._doc;

      //  create a jwt access token
      const AccessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET_PHRASE,
        { expiresIn: "7d" }
      );

      return res.status(200).json({ ...others, AccessToken });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

module.exports = router;
