const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const app = express();

require("dotenv").config();

const { initializeDBConnection } = require("./db/db.connect");
const internalServerError = require("./middleware/internalServerError");
const pageNotFound = require("./middleware/pageNotFound");
const authVerify = require("./middleware/authVerify");
const schema = require("./graphql/schema");

app.use(cors());
app.use(bodyParser.json());
initializeDBConnection();

app.get("/", (req, res) => {
  res.send("Social Media API.");
});

app.use(authVerify);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// ** Note: DO NOT MOVE (This should be last Route) **

// 404 error route Handler
app.use(pageNotFound);

// 500 server error handler
app.use(internalServerError);

app.listen(3000, () => {
  console.log("server started");
});
