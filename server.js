const express = require("express");
const ejs = require("ejs");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();
const path = require("path");

// DB connection
require("./src/db/conn");
const register = require("./src/models/registers");
const messages = require("./src/models/messages");

const port = process.env.PORT || 3001;

//Public Static Path

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/images", express.static(path.resolve(__dirname, "assets/images")));

const partials_path = path.join(__dirname, "../views/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

// //Routing
app.get("/", (req, res) => {
  res.render("login");
});

//home
app.get("/home", (req, res) => {
  res.render("home");
});

//about us
app.get("/about", (req, res) => {
  res.render("aboutus");
});

//future
app.get("/future", (req, res) => {
  res.render("future");
});

//google
app.get("/gogle", (req, res) => {
  res.render("gogle");
});

//team
app.get("/team", (req, res) => {
  res.render("team");
});

//register Page`
app.get("/register", (req, res) => {
  res.render("register");
});

//register post
app.post("/register", async (req, res) => {
  try {
    const registerCandidates = new register({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      cpassword: req.body.cpassword,
      secQue: req.body.secQue,
      profilePic: "Not Uploaded",
      totalDownloads: 0,
      totalPoints: 0,
    });
    const registered = await registerCandidates.save();
    res.status(201).render("login");
  } catch (error) {
    res.status(400).send(error);
  }
});

// login get
app.get("/login", (req, res) => {
  res.render("login");
});

// login post
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    user = await register.findOne({ email: email });
    userId = user._id;
    fname = user.firstname;
    lname = user.lastname;
    if (user.password === password) {
      res.redirect("home");
    } else {
      res.send(`
      <script>
        alert("Wrong Login Details"); window.location.href = "/login";
      </script>`);
    }
  } catch (error) {
    res.send(`
      <script>
        alert("Wrong Login Details"); window.location.href = "/login";
      </script>`);
  }
});

//contact
app.get("/contact", (req, res) => {
  res.render("contact");
});

// post contact
app.post("/contact", async (req, res) => {
  try {
    const contactMessage = new messages({
      name: req.body.name,
      email: req.body.email,
      msg: req.body.message,
    });
    const msg = await contactMessage.save();
    res.send(
      `<script>alert("Message Sent Successfully!!!"); window.location.href = "/home";</script>`
    );
    res.status(201).render("home");
  } catch (error) {
    res.send(`
      <script>
        alert("Error"); window.location.href = "/home";
      </script>`);
  }
});

//Listening to the port
app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
