const exp = require('express')
const Admin = require('../models/adminModel');
const expressAsyncHandler = require('express-async-handler')
const UserAuthor = require('../models/userAuthorModel')
const checkAdmin = require('./checkAdmin')
const adminApp = exp.Router();


// Route to check if a user is an admin 
adminApp.post("/admin", expressAsyncHandler(checkAdmin))

// Admin enables/disables users/authors
// adminApp.put("/update-status/:id", expressAsyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { isActive } = req.body;

//     try {
//         const updatedUser = await UserAuthor.findByIdAndUpdate(id, { isActive }, { new: true });
//         res.status(200).send({ message: "Status updated", payload: updatedUser });
//     } catch (error) {
//         res.status(500).send({ message: "Error updating status", error });
//     }
// }));

adminApp.put("/update-status/:id", expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
    try {
        const updatedUser = await UserAuthor.findByIdAndUpdate(id, { isActive }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).send({ message: "Status updated", payload: updatedUser });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).send({ message: "Error updating status", error: error.message });
    }
}));
adminApp.get('/check-email/:email', async (req, res) => {
    const admin = await AdminModel.findOne({ email: req.params.email });
    if (admin) {
      res.send({ message: "admin", payload: admin });
    } else {
      res.send({ message: "not found" });
    }
  });
  


module.exports = adminApp;