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
app.post("/signup", (req, res) => {
  const newHabitList = new HabitList(req.body);
  newHabitList.save();
  res.status(201).json(newHabitList);
});
//not working
/* app.post("/newuser", (req, res) => {
  const newUser = new User(req.body);
  newUser.save();
  res.status(201).json(newUser);
}); */
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
