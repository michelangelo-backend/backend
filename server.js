require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
const users = require('./routes/userRoutes');


const PORT = 3000;

mongoose.connect('mongodb+srv://austin:zlhHJ47JqHxraI1K@cluster0.eawefnj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.once("open", () => console.log("connected to mongoDB!!!!"));
const User = require("./models/User");
const HabitList = require("./models/HabitList");
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use("/users", users);
/* app.use(express.urlencoded({extended: true})); */ 


//Get all DATA
app.get("/everything", (req, res) => {
  HabitList.find().then((results) => res.status(200).json(results));
});
app.get("/user", (req, res) => {
  User.find().then((results) => res.status(200).json(results));
});
//Add user 
/* app.post("/signup", (req, res) => {
  const newHabitList = new HabitList(req.body);
  newHabitList.save();
  res.status(201).json(newHabitList);
}); */
const validateAuthRequestBody = (req, res, next) => {
  if (Object.keys(req.body).includes('password', 'username')) {
next()
  } else {
    res.status(400).json({ message: 'Username and password required'})
  }
}
//new user sign up
app.post("/signup", validateAuthRequestBody, (req, res) => {
  const { username, email, password } = req.body
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      res.status(400).json({ message: 'User already exists' })
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10)
      const newUser = new User({ username, email, password: hashedPassword })
      newUser.save()
        res.status(200).json({ username: newUser, id: newUser._id })
    }
  })
});
//login
app.post('/login', validateAuthRequestBody, (req, res) => {
  const { email, password } = req.body
  console.log({ email, password })
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(401).json({ message: "No such user" })
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = user.getToken()
        res.status(200).json({ auth: token })
      } else {
        res.status(400).json({ message: "Login error" })
      }
    })
    })
  })
//logout
app.delete('/logout', (req, res) => {
  const token = req.headers.authorization
  User.findOne({ auth: token }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: 'User error' })
    }
    user.auth = null
    user.save()
    res.status(200).json({ message: "Logged out" })
  })
})
//Add habit
app.post("/user/:userId/habits", (req, res) => {
  HabitList.findById(req.params.userId)
    .then((habitList) => {
      if (habitList) {
        habitList.scheduledHabitList.push({ habitTitle: req.body["habitTitle"], frequency: req.body["frequency"], completed: req.body["completed"] });
        habitList.save();
        return res.status(200).json(habitList);
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(400).json({ message: "Bad request" }));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});