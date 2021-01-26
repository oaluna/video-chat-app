const mongoose = require("mongoose");
const crypto = require('crypto');
const { nanoid } = require('nanoid')
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {

    name: {
      firstname: {
        type: String,
        required: true,
        trim: true,
      },
      lastname: {
        type: String,
        required: false,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    dark_theme: {
      type: Boolean,
      default: false,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    hashed_password: {
      type: String,
      required: 'Password is required'
    },
    salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
      }
  },
  { timestamps: true }
);

UsersSchema.path('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })
  UsersSchema.path('hashed_password').validate(function (v) {
    if (this._password && this._password.length < 6) {
      this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
      this.invalidate('password', 'Password is required')
    }
  }, null)

  UsersSchema.methods = {
    authenticate: function (plainText) {
      return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
      if (!password) return ''
      try {
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
      } catch (err) {
        return ''
      }
    },
    makeSalt: function () {
      return Math.round(new Date().valueOf() * Math.random()) + ''
    }
  }
module.exports = User = mongoose.model("users", UsersSchema);
