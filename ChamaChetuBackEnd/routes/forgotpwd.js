const router = require("express").Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

router.put("/forgot password", async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("No such user was found");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_PHRASE, {
      expiresIn: "20m",
    });
    const data = {
      from: "noreply@chamachetu.com",
      to: email,
      subject: "Reset password link",
      html: `
        <p>click the link below to reset your password</p>
    
        `,
    };
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/update password", async (req, res) => {
  const { resetLink, newPassword } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("No such user was found");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_PHRASE, {
      expiresIn: "20m",
    });
    const data = {
      from: "noreply@chamachetu.com",
      to: email,
      subject: "Reset password link",
      html: `
          <p>click the link below to reset your password</p>
      
          `,
    };
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
