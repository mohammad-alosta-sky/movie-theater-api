const express = require("express");
const {User, Show} = require("../models");

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
    res.json(await User.findAll());
})

usersRouter.get("/:id", async (req, res) => {
    res.json(await User.findByPk(req.params.id));
})

usersRouter.get("/:id/shows", async (req, res) => {
    let watchedShows = await User.findByPk(req.params.id, {include: Show})
    watchedShows = watchedShows.shows
    res.json(watchedShows);
})

usersRouter.put("/:id/shows/:showId", async (req, res) => {
    const user = await User.findByPk(req.params.id, {include: Show});
    const show = await Show.findByPk(req.params.showId);
    await user.addShow(show);
    res.json(user)
})


module.exports = usersRouter;