const mongoose = require("mongoose");

async function initializeDBConnection() {
  const mySecret = process.env["MONGODB_AUTH"];

  try {
    const uri = `mongodb+srv://${mySecret}@cluster0.iha7u.mongodb.net/social-media?retryWrites=true&w=majority`;
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection Completed!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { initializeDBConnection };
