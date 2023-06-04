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
    f_name: "",
    position: "",
    phone: "",
    country: "",
    user_type: "developer",
    edu_start: "",
    edu_end: "",
    degree: "",
    university: "",
    github: "",
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
  console.log("we are here");

  const {
    about,
    f_name,
    position,
    city,
    country,
    phone,
    edu_start,
    edu_end,
    degree,
    university,
    github,
  } = req.body;

  let id = req.params.id;
  let profile = await User.findById(id);
  if (profile) {
    profile.about = about;
    profile.f_name = f_name;
    profile.position = position;
    profile.city = city;
    profile.country = country;
    profile.phone = phone;
    profile.edu_start = edu_start;
    profile.edu_end = edu_end;
    profile.degree = degree;
    profile.university = university;
    profile.github = github;

    let result = await profile.save();
    res.status(201).send(result);
  } else {
    res.status(400).send("USER NOT FOUND ");
  }
});
const updateimages = asyncHandler(async (req, res) => {
  console.log("we are in images");
  let profile = await User.findById(req.params.id);
  console.log("profileis", profile);
  if (profile) {
    if (req.files.pImage) {
      let pImage = req.files.pImage[0].path;
      const profileImage = await cloudinary.uploader.upload(pImage);
      profile.pImage = {
        public_id: profileImage.public_id,
        url: profileImage.secure_url,
      };
    }
    if (req.files.bgImage) {
      let bgImage = req.files.bgImage[0].path;
      const backgroundImage = await cloudinary.uploader.upload(bgImage);
      profile.bgImage = {
        public_id: backgroundImage.public_id,
        url: backgroundImage.secure_url,
      };
    }
    let result = await profile.save();
    res.status(201).send(result);
  } else {
    res.status(404).send("something went wrong");
  }
});
const getProfile = asyncHandler(async (req, res) => {
  let id = req.params.id;

  let user = await User.findOne({ _id: id });
  if (user) {
    res.status(201).send({
      email: user.email,
      position: user.position,
      f_name: user.f_name,
      phone: user.phone,
      country: user.country,
      city: user.city,
      about: user.about,
      edu_end: user.edu_end,
      edu_start: user.edu_start,
      degree: user.degree,
      university: user.university,
      pImage:user.pImage,
      bgImage:user.bgImage
    });
  } else {
    res.status(404).send("user not found ");
  }
});


const getP=asyncHandler(async(req,res)=>{
  let id=req.params.id
  let user=await User.findById(id)
  if(user){
    res.status(201).send(user.pImage.url)
  }
  res.status(400).send("user not found ")
})

module.exports = {
  getProfile,
  registerUser,
  loginUser,
  updateProf,
  getUsers,
  updateimages,
  getP,
};
