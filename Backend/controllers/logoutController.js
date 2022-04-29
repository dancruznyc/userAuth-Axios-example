const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On Client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //successful req, No content
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  // is refreshtoken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204);
  }

  // Delete refresh form db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  }); // in production also want to add flag secure: true ... for https
  res.send(204);
};

module.exports = { handleLogout };
