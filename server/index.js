const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const passportAuth = passport.authenticate("jwt", { session: false });

const users = require("./routes/userRoutes");
const blogPosts = require("./routes/blogpostRoutes");

const app = express();

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true },
  () => console.log("MongoDB connected")
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );

app.use(passport.initialize());
// app.use(passport.session());

require("./services/passport")(passport);

app.use("/api/users", users);
app.use("/api/blogposts", passportAuth, blogPosts);
// Only ran inside production (in heroku)
if (process.env.NODE_ENV === "production") {
  // Express will server up prod assets
  // like main.js file or main.css file
  app.use(express.static("client/build"));
  // Express will serve up the index.html file
  // if it does not recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT);
