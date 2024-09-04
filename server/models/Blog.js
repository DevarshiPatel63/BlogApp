const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User'); 

const Blog = sequelize.define('blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    validate: {
      len: [3, 100],   
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    trim: true,
    validate: {
      len: [10, 10000], 
    }
  },
  category: {
    type: DataTypes.ENUM('Technology', 'Lifestyle', 'Food', 'Travel', 'Other'),
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: 'id'
    },
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Blog;
