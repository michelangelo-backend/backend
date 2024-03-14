const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
    res.json({ message: "Regsister"})
});

router.get("/login", (req, res) => {
    res.json({ message: "Login"})
});

router.get("/current", (req, res) => {
    res.json({ message: "Current User"})
});

module.exports = router;