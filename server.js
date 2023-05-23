const app = require("./app");
const moongoose = require("mongoose");

//const DB_HOST =
//  "mongodb+srv://Serhii:zm6pRFWChgpB6K.@cluster0.efcvmyh.mongodb.net/db-contacts";

const { DB_HOST } = require("./config");

moongoose.set("strictQuery", true);

moongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//app.listen(3000, () => {
//  console.log("Server running. Use our API on port: 3000");
//});
