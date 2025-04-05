const mongoose = require('mongoose')

// // create author schema
// const authorDataSchema = new mongoose.Schema({
//   nameOfAuthor:{
//       type: String,
//       required: true,
//   },
//   email: {
//       type: String,
//       required: true,
//   }
// }, {"strict": "throw"});

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["cultural", "academic", "sports", "other"], required: true },
    location: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    ticket_type: { type: String, enum: ["free", "paid"], default: "free", required: true },
    ticket_price: { type: Number, default: 0, required: true },
    participant_limit: {type: Number, required: true},
    participant_count: { type: Number, default: 0, required: true },
    registered_emails: {type: [String], required: true},
    created_at: { type: String },
    isArticleActive: {type: Boolean, default: true}
  });

// // create user comment schema
// const userCommentSchema = new mongoose.Schema({
//     nameOfUser:{
//         type: String,
//         required: true,
//     },
//     comment: {
//         type: String,
//         required: true,
//     }
// }, {"strict": "throw"})

// // Create article schema
// const articleSchema = new mongoose.Schema({
//     authorData: {
//         type: authorDataSchema,
//     },
//     articleId:{
//         type: String,
//         required: true
//     },
//     title:{
//         type: String,
//         required: true
//     },
//     title:{
//         type: String,
//         required: true
//     },
//     category:{
//         type: String,
//         required: true
//     },
//     content:{
//         type: String,
//         required: true
//     }, 
//     dateOfCreation:{
//         type: String,
//         required: true
//     },
//     dateOfModification:{
//         type: String,
//         required: true
//     },
//     comments:{
//         type: [userCommentSchema]
//     },
//     isArticleActive:{
//         type: Boolean,
//         required: true
//     }

// }, {"strict": "throw"})


// Create model for article
const Article = mongoose.model('article', articleSchema)

//export
module.exports = Article;