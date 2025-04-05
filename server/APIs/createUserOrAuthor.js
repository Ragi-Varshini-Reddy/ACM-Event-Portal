const UserAuthor = require('../models/userAuthorModel')
const Admin = require('../models/adminModel')
async function createUserOrAuthor(req, res){

// Get user or author object from req
const newUserAuthor = req.body;

// Find the user by email id
const userInDb = await UserAuthor.findOne({email: newUserAuthor.email})
const adminInDb = await Admin.findOne({email: newUserAuthor.email})

// If user or author  or admin with that mail id exists
if(userInDb || adminInDb){
    const existingUser = userInDb || adminInDb;
    //check if the role is same
    if(newUserAuthor.role === existingUser.role){
        if(existingUser.isActive === false){
            res.status(200).send({message: "Your account has been disabled by the admin. Please contact support."})
        }
        else{
            res.status(200).send({message: newUserAuthor.role, payload: existingUser})
        }  
    } else {
        res.status(200).send({message: "Invalid role"})
    }
} else {
    // Create new user and save in DB
    let newUser = new UserAuthor(newUserAuthor);
    let newUserAuthorDoc = await newUser.save();
    res.status(201).send({message:newUserAuthorDoc.role, payload: newUserAuthorDoc})
}
}

module.exports = createUserOrAuthor;