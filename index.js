const express = require("express");
const port = 8999;
const server = express();
const path = require("path");
const multer = require("multer");
const db = require("./config/mongoose");
const panelLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const jwtStrategy = require("./config/passport_jwt");

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

const passport = require("passport");
const localStrategy = require("./config/local_Strtgy");
const session = require("express-session");

// server.use(connection)
server.use(panelLayouts);
server.use(express.urlencoded());
server.use(express.static("assets"));
server.use(cookieParser());

server.use(
  session({
    name: "cyber",
    secret: "blasome",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 200,
    },
  })
);

server.use(passport.session());
server.use(passport.initialize());

server.use(passport.setAuthenticatedUser);

server.use("/", require("./routes/index")); 
  
//----multer Test----

// const upload = multer({ dest: "uploads/" });
// server.post("/upload", upload.single("file"), (req, res) => {
//   res.json({ status: "success" });
// });

server.listen(port, function (err) {
  if (err) {
    console.log("server is in error" + err);
    return false;
  }
  console.log("server is on port:" + port);
});
