const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user']
  },
  token: {
    type: String
  }
});

UserSchema.pre('save', async function(next) {
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

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.cryptPass = async function(password) {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, salt);
  if (pass) return pass;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
