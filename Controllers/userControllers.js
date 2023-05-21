const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../Models/User");
const cloudinary = require("../Middlewares/cloudinary");

//generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// this function get the users
// the route is GET/api/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// this function gets a user data
// the route is GET/api/users/user
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email, role } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name: name,
    email: email,
    role: role,
  });
});

// this function Registers a user
// the route is POST/api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body)
  // console.log(pImage)

  if (!name || !email || !password) {
    res.status(400).send("please fill all fields");
    throw new Error("Please fill all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(420).send("Email already in use!!");
  }

  //hashing password
  const hash = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, hash);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
    about: "",
    pImage: {},
    bgImage: {},
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
      pImage: user.pImage,
      bgImage: user.bgImage,
      about: user.about,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// this function Authenticate a user
// the route is POST/api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, userType } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      userType: user.userType,
    });
  } else if (!user) {
    res.status(420).send("This Email does not match any users");
  } else {
    res.status(420).send("invalid email or password");
  }
});

const updateProf = asyncHandler(async (req, res) => {
  let pImage = req.files.pImage[0].path;
  let bgImage = req.files.bgImage[0].path;
  const { about } = req.body;
  // profileImage: ,
  //   bgImage: ,
  let id = req.params.id;
  let profile = await User.findById(id);
  if (profile) {
    const profileImage = await cloudinary.uploader.upload(pImage);
    const backgroundImage = await cloudinary.uploader.upload(bgImage);
    profile.about = about;
    (profile.bgImage = {
      public_id: backgroundImage.public_id,
      url: backgroundImage.secure_url,
    }),
      (profile.pImage = {
        public_id: profileImage.public_id,
        url: profileImage.secure_url,
      });
    let result = await profile.save();
    res.status(201).send(result);
  } else {
    res.status(400).send("something went wrong");
  }
});

module.exports = {
  registerUser,
  loginUser,
  updateProf,
  getUsers,
  getUser,
};
