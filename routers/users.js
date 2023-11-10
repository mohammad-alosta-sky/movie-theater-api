const express = require("express");
const {User, Show} = require("../models");

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
    res.json(await User.findAll());
})

module.exports = usersRouter;