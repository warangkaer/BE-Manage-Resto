const userRepo = require("../repositories/user.repository.js")
const jwtAction = require("../action/jwt.action.js");
const bcrypt = require("bcrypt");

exports.signIn = async (req, res) => {
  try {
    const user = await userRepo.getUserByUsername(req.body.username)

    if (!user) {
      return res.status(401).json({ message: "Invalid Credential", data: {} })
    }
    
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    
    if (isPasswordValid == false) {
      return res
        .status(401)
        .json({ message: "Username and password doesn't match", data: {} })
    }

    const token = jwtAction.createToken(user)
    return res.status(200).json({ message: "success", data: token })
  } catch (err) {
    return res.status(400).json({ message: err.message, data: {} })
  }
}

exports.signUp = async (req, res) => {
  try {
    const user = await userRepo.createUser(req.body)

    const token = jwtAction.createToken(user)
    return res.status(200).json({ message: "success", data: token })

  } catch (err) {
    return res.status(400).json({ message: err, data: {} })
  }
}
