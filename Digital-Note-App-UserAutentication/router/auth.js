const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");

const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
require("../db/conn");
const User = require("../model/userSchema");

router.use(cookieParser());
router.get("/", (req, res) => {
  res.send("HEllO WORLD FROM SERVER router js");
});

//  Using Promises

//     router.post('/register',(req,res)=>{
//     //  object destructuring concept
//      const {name,email,phone,work,password,cpassword} = req.body;

//          if(!name || !email || !phone|| !work|| !password|| !cpassword)
//          {
//              return res.status(422).json({error:"Plz fill everything"});
//          }

//          User.findOne({email:email}).then((userExist)=>{
//              if(userExist){
//                  return res.status(422).json({error:"Email already exists"});
//              }

//              const user = new User({name:name,email:email,phone:phone,work:work,password:password,cpassword:cpassword})

//              user.save().then(()=> {
//                  res.status(201).json({message:"user registered successfully"});
//              }).catch((error)=>{
//                  res.status(500).json({error:"Failed to register"});
//              })
//          }).catch(err =>{console.log(err)});

//         //  console.log(name);
//         //  console.log(email);
//         // // res.json({message:req.body});
//     //    res.send('Mera router page');

// });

// using async and await
router.post("/register", async (req, res) => {
  //  object destructuring concept

  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill everything" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password is not matching" });
    } else {
      const user = new User({
        name: name,
        email: email,
        phone: phone,
        password: password,
        cpassword: cpassword,
      });
      const userRegister = await user.save();

      if (userRegister) {
        res.status(201).json({ message: "user registered successfully" });
      } else {
        res.status(500).json({ error: "Failed to register" });
      }
      //yha pe
    }
  } catch (err) {
    console.log(err);
  }

  //  console.log(name);
  //  console.log(email);
  // // res.json({message:req.body});
  //    res.send('Mera router page');
});
/////////Edit////////////////////


/////Edit////////////////////

//login route
router.post("/signin", async (req, res) => {
  try {
    var token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill data" });
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        experies: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials pass" });
      } else {
        res.json({ error: "user Signin Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }

    //   console.log(userLogin);
    // //   res.json({message:"User signin success"});
  } catch (err) {
    console.log(err);
  }
});
//about us
router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});
//get user data for contact and home
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

//Edit user Info
router.get("/edit", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/logout", (req, res) => {
  console.log("logout successfull");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

module.exports = router;
