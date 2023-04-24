const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'media', 'admin', 'owner'],
    default: 'user',
  },
  have: {
    type: String,
    required: true,
    enum: ['lite', 'v4', 'none'],
    default: 'none',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Username already exists'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
