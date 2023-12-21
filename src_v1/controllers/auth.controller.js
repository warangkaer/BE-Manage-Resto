const userRepo = require("../repositories/user.repository.js");
const jwtAction = require("../action/jwt.action.js");
const bcrypt = require("bcrypt");

exports.signIn = async (req, res) => {
  try {
    const user = await userRepo.getUserByUsername(req.body);
   
    if (!user) {
      return res.status(401).json({ message: "Invalid Credential", data: {} });
    }
    if (!bcrypt.compare(`${req.body.password}`, user.password)) {
      return res
        .status(401)
        .json({ message: "Username and password doesn't match", data: {} });
    }

    const token = jwtAction.createToken(user);
    return res.status(200).json({ message: "success", data: token });
  } catch (err) {
    return res.status(400).json({ message: err, data: {} });
  }
};

exports.signUp = async (req, res) => {
  try {
    const user = await userRepo.createUser(req.body);
    
    if (user) {
      const token = jwtAction.createToken(user);
      return res.status(200).json({ message: "success", data: token });
    }

    return res
      .status(422)
      .json({ message: "Please fill all required field", data: {} });
  } catch (err) {
    return res.status(400).json({ message: err, data: {} });
  }
};

