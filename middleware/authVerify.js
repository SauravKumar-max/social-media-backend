const jwt = require("jsonwebtoken");

function authVerify(req, res, next) {
  let token = req.headers.authorization;
  const mySecret = process.env["TOKEN_SECRET"];
  if (token) {
    try {
      const decoded = jwt.verify(token, mySecret);
      req.auth = true;
      req.user = { userId: decoded.userId };
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "authorization not complete please add token!" });
    }
  } else {
    req.auth = false;
    next();
  }
}

module.exports = authVerify;
