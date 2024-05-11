require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const path = require("path");
const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/adminRoutes");
// const db = require("./config/database");

// app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
  })
);

// db.execute("SELECT * FROM product")
//   .then(result => {
//     console.log(result[0], result[1]);
//   })
//   .catch(err => {
//     console.log(err);
//   });

app.use(indexRoutes);
app.use(adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
