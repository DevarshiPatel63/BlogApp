const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the blog post'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide content for the blog post'],
    trim: true,
    minlength: [10, 'Content must be at least 10 characters long']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please specify a category for the blog post'],
    enum: ['Technology', 'Lifestyle', 'Food', 'Travel', 'Other']
  },
});

module.exports = mongoose.model('Blog', BlogSchema);