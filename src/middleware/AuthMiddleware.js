const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  let token = req.headers["token"];
  jwt.verify(token, "123-xxy", function (err, decodedData) {
    if (err) {
      // If there's an error in verification, send a 401 (unauthorized) response
      res.status(401).json({ status: "unauthorized" });
    } else {
      let email = decodedData["data"];

      req.headers.email = email;
      next();
    }
  });
};
