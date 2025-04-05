const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  role:{
    type: String,
    required: true,
},
firstName:{
    type: String,
    required: true,
},
lastName:{
    type: String,
},
email:{
    type: String,
    required: true,
    unique: true,
}
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
