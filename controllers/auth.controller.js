const User = require("../models/user.model");
const bcrypt = require("bcrypt");

function getSignup(req, res) {
  let sessionData = req.session.flashedData;

  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      userName: "",
      city: "",
      pastal: "",
      street: "",
    };
  }

  req.session.flashedData = null;
  res.render("auth/signup", { inputData: sessionData });
}

async function signUp(req,res) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    userName: req.body.username,
    city: req.body.city,
    postal: req.body.postal,
    street: req.body.street,
  };
  if (
    !enteredData.email ||
    !enteredData.email.includes("@") ||
    enteredData.password.trim().length < 6 ||
    !enteredData.userName ||
    enteredData.userName.trim() === "" ||
    !enteredData.city ||
    enteredData.city.trim() === "" ||
    !enteredData.postal ||
    enteredData.postal.trim().length !== 5 ||
    !enteredData.street ||
    enteredData.street.trim() === ""
  ) {
    req.session.flashedData = {
      errorMassage:
        "User details are not valid.Postal code must be 5 character long.password must be 6 or more characters long!",
      ...enteredData,
    };
    req.session.save(function () {
      res.redirect("/signup");
    });

    return;
  }

  if (enteredData.email !== enteredData.confirmEmail) {
    req.session.flashedData = {
      errorMassage: "Confirm your email correctly",
      ...enteredData,
    };
    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.username,
    req.body.city,
    req.body.postal,
    req.body.street
  );

  const userExistsAlready = await user.getUserWithSameEmail();
  if (userExistsAlready) {
    req.session.flashedData = {
      errorMassage: "You Already have an Account, Login instead!",
      ...enteredData,
    };
    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  await user.signup();

  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = req.session.flashedData;
  if(!sessionData){
    sessionData = {
        email: "",
        password: "",
    }
}


  req.session.flashedData = null;
  res.render("auth/login",{inputData: sessionData});
}

 async function login(req,res){
  const enteredData = {
    email: req.body.email,
    password: req.body.password,

  }

  const user = new User(req.body.email,req.body.password);
  
  const userWithSameEmail = await user.getUserWithSameEmail();

  if(!userWithSameEmail){
    req.session.flashedData = {
      errorMassage:
        "Invalid Email or Password",
      ...enteredData,
    };
    req.session.save(function () {
      res.redirect("/login");
    });

    return;

  }

const passwordIsCurrect = await bcrypt.compare(user.password,userWithSameEmail.password);
if(!passwordIsCurrect){
  req.session.flashedData = {
    errorMassage:
      "Invalid Email or Password",
    ...enteredData,
  };
  req.session.save(function () {
    res.redirect("/login");
  });

  return;

}
  

  req.session.uid = userWithSameEmail._id.toString();
  req.session.isAdmin = userWithSameEmail.isAdmin;
  req.session.save(function(){
    if(req.session.isAdmin){
      res.redirect('/admin/products')
    }else{
    res.redirect('/');
    }
  })

}

function logout(req,res){
req.session.uid = null;
res.redirect('/login');
}
module.exports = {
  getSignup: getSignup,
  signUp: signUp,
  getLogin: getLogin,
  login: login,
  logout: logout
};
