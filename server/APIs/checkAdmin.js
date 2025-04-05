const Admin = require('../models/adminModel')
async function checkAdmin(req, res){

// Get admin object from req
const admin = req.body;

// Find the admin by email id
const adminInDb = await Admin.findOne({email: admin.email})

// If admin with that mail id exists
if(adminInDb != null){
    res.status(200).send({message: admin.role, payload: adminInDb})
} else {
    res.status(200).send({message: "Invalid role"})
}
}

module.exports = checkAdmin;