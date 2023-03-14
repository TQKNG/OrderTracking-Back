const bcrypt = require("bcrypt");
const User = require("../models/userModel");

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
const getUserById = async (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      res.status(500).json("User not found");
    });
};

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

  // Response the user info
  if (user) {
    const { _id, username } = user;
    res.status(201).json({
      _id,
      username,
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

  try {
    const user = await User.findOne({ username });
    // If user exist, check passwords
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
      res.status(400).json("Password is not correct");
    } else {
      if (user && passwordIsCorrect) {
        const { _id, username } = user;
        return res.status(200).json({
          _id,
          username,
        });
      } else {
        res.status(400).json("Invalid Email or Password");
      }
    }
  } catch (err) {
    res.status(400).json("Invalid Email or Password");
  }
};

// Logout User
const logoutUser = async (req, res) => {
  return res.status(200).json({ message: "Successfully Logged Out" });
};

module.exports = {
  getAllUser,
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
};
