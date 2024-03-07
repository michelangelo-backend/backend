const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
     /*  unique: true, */
    },
    password: {
      type: String,
      required: true,
    },
    auth:{
      type: String
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.isAutheticated = function () {
  return this.auth !== null
}

userSchema.methods.getToken = function () {
  console.log('Generating token')
  let token 
  if (this.auth) {
    token = this.auth
  } else {
    token = auth.generateToken()
    this.auth = token
    this.save()
  }
  return token
}
module.exports = mongoose.model('User', userSchema);