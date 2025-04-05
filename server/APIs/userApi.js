const exp = require('express')
const userApp = exp.Router();
const UserAuthor = require('../models/userAuthorModel')
const expressAsyncHandler = require('express-async-handler')
const createUserOrAuthor = require('./createUserOrAuthor')
const Article = require('../models/articleModel')

//To create a new user
userApp.post("/user", expressAsyncHandler(createUserOrAuthor))

//To add comment
userApp.put('/comment/:articleId', expressAsyncHandler(async(req, res) => {
    // Get comment object
    const commentObj = req.body;
    // Add comment object to comments array of article id
    const articleWithComments = await Article.findOneAndUpdate(
        {articleId: req.params.articleId},
        {$push: {comments: commentObj}},
        {returnOriginal: false}
    )
    res.status(200).send({message: "Comment added", paylaod: articleWithComments})
}))

userApp.get("/articles", expressAsyncHandler(async(req, res) => {
    // read all articles from db
    const listOfArticles = await Article.find({isArticleActive: true});
    res.status(200).send({message: "articles", payload: listOfArticles})
}))

// Fetch all users
userApp.get("/users", expressAsyncHandler(async (req, res) => {
    try {
        const users = await UserAuthor.find({ role: "user" }); // Fetch only users
        res.status(200).send({ message: "Users fetched", payload: users });
    } catch (error) {
        res.status(500).send({ message: "Error fetching users", error });
    }
}));


module.exports = userApp;