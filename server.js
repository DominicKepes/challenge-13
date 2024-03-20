const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
async function startServer() {
  try {
    await sequelize.sync({ force: false })
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

startServer()