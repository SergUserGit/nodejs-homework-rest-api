const app = require("./app");
const moongoose = require("mongoose");
const { DB_HOST } = process.env;

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
