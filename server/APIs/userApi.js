const exp = require('express')
const userApp = exp.Router();
const UserAuthor = require('../models/userAuthorModel')
const expressAsyncHandler = require('express-async-handler')
const createUserOrAuthor = require('./createUserOrAuthor')
const Article = require('../models/articleModel')
const User = require('../models/userRegistrationModel');

//To create a new user
userApp.post("/user", expressAsyncHandler(createUserOrAuthor))

//To add comment
// userApp.put('/comment/:articleId', expressAsyncHandler(async(req, res) => {
//     // Get comment object
//     const commentObj = req.body;
//     // Add comment object to comments array of article id
//     const articleWithComments = await Article.findOneAndUpdate(
//         {articleId: req.params.articleId},
//         {$push: {comments: commentObj}},
//         {returnOriginal: false}
//     )
//     res.status(200).send({message: "Comment added", paylaod: articleWithComments})
// }))

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

// POST /api/articles/:id/register
userApp.post('/register', async (req, res) => {
    const { email, event_name } = req.body;
    console.log(req.body); // Add this in POST /article route
    try {
      // Fetch the article by ID
      const article = await Article.findOne({title: event_name});
      console.log(article)
      if (!article) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Check if the article is active
      if (!article.isArticleActive) {
        return res.status(403).json({ message: 'Registration is closed for this event' });
      }
  
      // Check participant limit
      if (article.participant_count >= article.participant_limit) {
        return res.status(403).json({ message: 'Event is full' });
      }
  
      // Check if email already registered
      if (article.registered_emails.includes(email)) {
        return res.status(409).json({ message: 'Email already registered' });
      }
  
      // Register the email
      article.registered_emails.push(email);
      article.participant_count += 1;
      await article.save();
  
      res.status(200).json({ message: 'Successfully registered', updated_article: article });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

module.exports = userApp;