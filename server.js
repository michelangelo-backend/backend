require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
const users = require('./routes/userRoutes');
const bcrypt = require('bcryptjs');

const PORT = 3000;
//mongoose.connect(process.env.DATABASE_URL)
mongoose.connect('mongodb+srv://austin:zlhHJ47JqHxraI1K@cluster0.eawefnj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.once("open", () => console.log("connected to mongoDB!!!!"));
const User = require("./models/User");
const Habit = require('./models/Habit');
const Record = require("./models/Record");
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use("/users", users);
/* app.use(express.urlencoded({extended: true})); */ 



//get user
app.get("/user", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "User error" })
  }
  User.findOne({ auth: token }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.setHeader('Cache-Control', 'no-store'); // Prevent caching
    res.status(200).json(user);
  }).catch(error => {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error" });
  });
});
/* app.get("/user", (req, res) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(400).json({ message: "User error" })
  }
  User.findOne({ auth: token }).then((user) =>
    res.status(200).json(user))
  }) */

//Get user habits
app.get("/habits", (req, res) => {
  const token = req.headers.authorization.split(" ");
  if (!token) {
    return res.status(400).json({ message: "User error" })
  }
  User.findOne({ auth: token }).then((user) => {
    Habit.find({ user }).then((results) =>
    res.status(200).json(results))
  })
})
//Add habit
app.post("/habits", (req, res) => {
  const token = req.headers.authorization.split(" ");
  User.findOne({ auth: token }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "not found" })
    }
    const newHabit = new Habit({ ...req.body, user: user})
          newHabit.save();
        return res.status(200).json(newHabit);
      })
    .catch((error) => res.status(400).json({ message: "Bad request" }));
})
//Add habit and record
/* app.post("/habits", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({ auth: token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new habit
    const newHabit = new Habit({ ...req.body, user: user._id });
    await newHabit.save();

    // Create a record for the new habit
    const newRecord = new Record({
      habit: newHabit._id,
      habitName: newHabit.habitName,
      date: new Date(),
      status: 'Incomplete',
    });
    await newRecord.save();

    return res.status(200).json(newHabit);
  } catch (error) {
    console.error("Error creating habit:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}); */
//auth function
const validateAuthRequestBody = (req, res, next) => {
  if (Object.keys(req.body).includes('password', 'email')) {
next()
  } else {
    res.status(400).json({ message: 'Email and password required'})
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
        console.log(token)
      } else {
        res.status(400).json({ message: "Invalid Password" })
      }
    });
  }).catch(error => {
    console.error("Error finding user:", error);
    return res.status(500).json({ message: "Internal server error" });
  });
});
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


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
