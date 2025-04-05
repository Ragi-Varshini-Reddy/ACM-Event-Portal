const exp = require('express')
const authorApp = exp.Router();
const expressAsyncHandler = require('express-async-handler')
const createUserOrAuthor = require('./createUserOrAuthor')
const Article = require('../models/articleModel')
const UserAuthor = require('../models/userAuthorModel')
const {requireAuth} = require('@clerk/express')
require('dotenv').config()

//To create a new author
authorApp.post("/author", expressAsyncHandler(createUserOrAuthor))

// To create new article
authorApp.post("/article", expressAsyncHandler(async(req, res) => {

    // get new article obj from the request
    const newArticleObj = req.body;
    const newArticle = new Article(newArticleObj);
    const newArticleObjDoc = await newArticle.save()
    res.status(201).send({message: "event published", payload: newArticleObjDoc})
}))

// To read all articles
authorApp.get("/articles", requireAuth({signInUrl: "unauthorized"}), expressAsyncHandler(async(req, res) => {
    // read all articles from db
    const listOfArticles = await Article.find({isArticleActive: true});
    res.status(200).send({message: "articles", payload: listOfArticles})
}))

authorApp.get('/unauthorized', (req, res) => {
    res.send({message: "Unauthorized request"})
})

// To modify an article by article id
authorApp.put('/article/:articleId', requireAuth({signInUrl: "unauthorized"}), expressAsyncHandler(async(req, res) => {
    // Get modified article
    const modifiedArticle = req.body;

    // Update article by article id
    const dbRes = await Article.findByIdAndUpdate(modifiedArticle._id, {...modifiedArticle}, {returnOriginal: false})
    res.status(200).send({message: "Article updated", payload: dbRes})
}))

// To do soft delete an article by article id
authorApp.put('/articles/:articleId', requireAuth({signInUrl: "unauthorized"}), expressAsyncHandler(async(req, res) => {
    // Get modified article
    const modifiedArticle = req.body;

    // Update article by article id
    const latestArticle = await Article.findByIdAndUpdate(modifiedArticle._id, {...modifiedArticle}, {returnOriginal: false})
    res.status(200).send({message: "Article deleted or restored", payload: latestArticle})
}))

// Fetch all authors
authorApp.get("/authors", expressAsyncHandler(async (req, res) => {
    try {
        const authors = await UserAuthor.find({ role: "author" });
        res.status(200).send({ message: "Authors fetched", payload: authors });
    } catch (error) {
        res.status(500).send({ message: "Error fetching authors", error });
    }
}));
authorApp.get('/check-email/:email', async (req, res) => {
    const author = await AuthorModel.findOne({ email: req.params.email });
    if (author) {
      res.send({ message: "author", payload: author });
    } else {
      res.send({ message: "not found" });
    }
  });
  


module.exports = authorApp;