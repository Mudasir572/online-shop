const User = require("../models/user.model");

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
  res.render("auth/login");
}

function login(req,res){

}
module.exports = {
  getSignup: getSignup,
  signUp: signUp,
  getLogin: getLogin,
  login: login
};
