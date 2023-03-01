const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

// Get All User
const getAllUser = (req, res) => {
  User.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(`Interal Server Error: ${err}`);
    });
};

// Get User by Id
const getUserById = async (req,res)=>{
    const {id} = req.params;
    User.findById(id)
    .then((user)=>{
        res.status(200).json({user});
    })
    .catch((err)=>{
        res.status(500).json("User not found");
    })

}

// Register User
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  // Validation
  if (!username || !password) {
    res.status(400).json("No username and password in request");
  }

  if (password.length < 6) {
    res.status(400).json("Password length must be more than 6 characters");
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400).json("Username already exist");
  }

  // Create new user
  const user = await User.create({
    username,
    password,
  });

  // Generate Token
  const token = generateToken(user._id);

  // Create Cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 60 * 1000),
    sameSite: "none",
    secure: true,
  });

  // Response the user info
  if (user) {
    const { _id, username } = user;
    res.status(201).json({
      _id,
      username,
      token,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  //Validate Request
  if (!username || !password) {
    res.status(400);
    throw new Error("Please add username and password");
  }

  User.findOne({ username })
  .then((user) => {
    // If user exist, check passwords
    const passwordIsCorrect = bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
      return res.status(400).json("Password is not correct");
    } 
    else {
      // Generate Token
      const token = generateToken(user._id);

      // Create Cookie
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 60 * 1000),
        sameSite: "none",
        secure: true,
      });

      if (user && passwordIsCorrect) {
        const { _id, username } = user;
        res.status(200).json({
          _id,
          username,
          token,
        });
      } else {
        res.status(400).json("Invalid Email or Password");
      }
    }
  })
  .catch((err)=>{
    res.status(400).json("Invalid Email or Password")
  })
};

// Logout User
const logoutUser = async(req,res)=>{
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
      });
      return res.status(200).json({ message: "Successfully Logged Out" });
}

module.exports = {
  getAllUser,
  registerUser,
  loginUser,
  logoutUser,
  getUserById
};
