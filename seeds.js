const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const User = require('./models/userModel');
const admin = {
  name: 'admin',
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: 'ADMIN',
};
if (process.env.NODE_ENV === 'development') {
  mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(async (result) => {
      await User.create(admin);
      console.log('create admin is success');
    })
    .catch((err) => {
      console.log(err);
    });
} else {
  mongoose
    .connect(process.env.DATABASE)
    .then(async (result) => {
      await User.create(admin);
      console.log('create admin is success');
    })
    .catch((err) => {
      console.log(err);
    });
}
