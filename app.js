require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const corst = require("cors");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const path = require("path");
const indexRoutes = require("./routes/indexRoutes");
const adminRoutes = require("./routes/adminRoutes");

// app.use(morgan("dev"));
app.use(corst());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/edit-product", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
  })
);


app.use(adminRoutes);
app.use(indexRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
