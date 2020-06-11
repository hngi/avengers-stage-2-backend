require("dotenv").config();
const app  =  require("./app");


console.log(process.env.PORT);
// const server = http.createServer(app);

// require('./startup/config')()
require('./db/db-connection');
require('./startup/routes')(app);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Listening on port ${process.env.PORT}`);
});
