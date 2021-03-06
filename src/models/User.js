const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    email : {
        required : true,
        type : String,
        unique : true
    },
    username : {
        type: String,
        required : true
    },
    password : {
        type : String,
        require : true
    },
    _token : {
        type : String
    }
}, {timestamps : true})

UserSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
);

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
}

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel