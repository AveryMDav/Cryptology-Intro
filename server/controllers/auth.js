let users = [];
const bcrypt = require('bcryptjs');

module.exports = {
      login: (req, res) => {
      console.log('Logging In User');

      const { username, password } = req.body;

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
        const existing = bcrypt.compareSync(password, users[i].passHash)
        if (existing) {
            let userToReturn = {...users[i]}
            delete userToReturn.passHash
          return res.status(200).send(userToReturn);
          
        }
      }
    }
    return res.status(400).send("User not found.");
  },

    register: (req, res) => {

        const {username, email, firstName, lastName, password} = req.body;

        for (i=0; i < users.length; i++){
          const existing = bcrypt.compareSync(password, users[i].passHash);

          if (existing) {
            return
          }
        };

        const salt = bcrypt.genSaltSync(5);
        const passHash = bcrypt.hashSync(password, salt);

        let userObj = {
          passHash,
          username,
          email,
          firstName,
          lastName,
        }

        console.log('Registering User');
        users.push(userObj);
        // console.log(users);
        let infoToReturn = {...userObj};
        delete infoToReturn.passHash;
        res.status(200).send(infoToReturn);
    }
}
// console.log(users)