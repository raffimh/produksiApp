exports.getIndex = (req, res, next) => {
  res.render("auth", {
    pageTitle: "Login Area",
    path: "/",
  });
};

