
const Users = require('./auth-model.js')


const checkUsernameFree = async (req, res, next) => {

    const name = req.body.username
    const users = await Users.find()
    const exists = users.find(user => user.username === name)
    if (exists) {
        res.status(422).json({ message: "Username taken" })
    } else {
        next()
    }
}

function validateUser(req, res, next) {

    const { password, username } = req.body
    if ( password === undefined|| username === undefined) {
      res.status(422).json({message: "username and password must be there"})
    } else {
      next()
    }
  
  }

  // function checkUsernamePresence(req, res, next) {

  //   const { username } = req.body
  //   if ( username === undefined) {
  //     res.status(422).json({message: "Username must be there"})
  //   } else {
  //     next()
  //   }
  
  // }


module.exports = {

    checkUsernameFree,
    validateUser
}