const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async value => {
        if (!this.isModified('username')) return true;

        const user = await User.findOne({ username: value });
        if (user) throw new Error(`The username ${value} has already existed.`);
        return true;
      },
      message: async props => {
        return `The username ${props} has already existed.`;
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async next => {
  if (!this.isModified('password')) return next();
  const SALT_WORK_FACTOR = 10;

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.generateToken = function() {
  return nanoid();
};

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
