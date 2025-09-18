require("dotenv").config();
const { app } = require("./app.js");
const { connnectDB } = require("./src/db/db.init.js");

const PORT = process.env.PORT || 3000;
connnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("MONGO db connection failed !!!", err);
  });
