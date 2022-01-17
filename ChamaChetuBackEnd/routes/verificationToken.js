const jwt = require("jsonwebtoken");
const Group = require("../Models/Group");
const User = require("../Models/User");

//verify if the auth token is correct

const verifyToken = (req, res, next) => {
  const authHeader = req.header.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_PHRASE, (err, user) => {
      if (err) res.status(403).json("Invalid or expired token");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("Not authenticated");
  }
};

//verify that the user is authorised

const verifyTokenAndAuthorisation = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Not authorised");
    }
  });
};

// verify that the user is an admin

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Only admin is allowed to do that");
    }
  });
};

const verifyTokenAndGroupChair = (req, res, next) => {
    verifyToken(req, res, () => {
    if (req.user.isChairPerson) {
      const group = Group.findById(req.params.groupId);
      if (group.chairPerson === req.user._id) {
        next();
      } else {
        res.status(403).json("You are not the chair of this group");
      }
    } else {
      res.status(403).json("Only  the group chairs are allowed to do this");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
  verifyTokenAndGroupChair,
};
