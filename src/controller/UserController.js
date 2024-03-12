const UsersModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");

///////////// registration
exports.registration = async (req, res) => {
  try {
    const reqBody = req.body;
    await UsersModel.create(reqBody);

    res.json({ status: "success", message: "Registration Completed" });
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};

////////////

exports.login = async (req, res) => {
  try {
    let reqBody = req.body;

    const user = await UsersModel.find(reqBody);

    if (user.length > 0) {
      // jwt token

      let playload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: reqBody["email"],
      };

      let token = jwt.sign(playload, "123-xxy");
      res.json({ status: "sucess", message: "user found", token: token });
    } else {
      res.json({ status: "fail", message: "userLOgin fail" });
    }
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};

/////////////////////////////////////////////////

exports.profileDetails = async (req, res) => {
  try {
    let email = req.headers["email"];

    let result = await UsersModel.find({ email: email });
    res.json({ status: "success", data: result });
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};

///////////////////////////////////////\\\

exports.profileUpdate = async (req, res) => {
  try {
    let email = req.headers["email"];
    let reqBody = req.body;
    await UsersModel.updateOne({ email: email }, reqBody);
    res.json({ status: "success", message: "update completed" });
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};
