const User = require('../models/User');
const Blog = require('../models/Blog');

function createAssociations() {
  User.hasMany(Blog, { foreignKey: 'authorId', as: 'blogs' });
  Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
}

module.exports = createAssociations;