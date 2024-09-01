const express = require('express');
const { sequelize } = require('./config/database');

const app = express();
const port = 5000;

app.use(express.json());

// Synchronize models with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
    
    app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

// Available Routes
app.use('/api/auth', require('./routes/auth'));
