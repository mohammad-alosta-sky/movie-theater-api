const express = require("express");
const {User, Show} = require("../models");

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
    res.json(await User.findAll());
})

usersRouter.get("/:id", async (req, res) => {
    res.json(await User.findByPk(req.params.id));
})

usersRouter.get("/shows/:id", async (req, res) => {
    let watchedShows = await User.findByPk(req.params.id, {include: Show})
    watchedShows = watchedShows.shows
    res.json(watchedShows);
})

usersRouter.put("/", async (req, res) => {
    await User.create(req.body);
    res.json("Done.")
})


module.exports = usersRouter;