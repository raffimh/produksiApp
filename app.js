require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
