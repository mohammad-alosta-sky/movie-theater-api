const express = require("express");
const {Show} = require("../models");
const {check, validationResult} = require("express-validator")


showsRouter = express.Router()


showsRouter.get("/", async (req, res) => {
    res.json(await Show.findAll());
})

showsRouter.get("/:id", async (req, res) => {
    res.json(await Show.findByPk(req.params.id));
})

showsRouter.get("/genres/:genre", async (req, res) => {
    res.json(await Show.findAll({where: {genre: req.params.genre}}))
})

showsRouter.put("/:id/watched",[
        check("available").not().isEmpty().trim().isLength({min: 5, max: 25}),
        check("genre").isEmpty(),
        check("rating").isEmpty(),
        check("title").isEmpty()
    ], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({errors: errors.array()});
    } else {
        const show = await Show.findByPk(req.params.id);
        await show.update(req.body)
        res.json(show)
    
    }
})

showsRouter.put("/:id/updates",[
    check("rating").not().isEmpty().trim().isNumeric(),
    check("genre").isEmpty(),
    check("available").isEmpty(),
    check("title").isEmpty()
] , async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.json({errors: errors.array()});
    } else {
        const show = await Show.findByPk(req.params.id);
        await show.update(req.body)
        res.json(show)
    }
})

showsRouter.delete("/:id", async (req, res) => {
    Show.destroy({where: {
        id: req.params.id
    }})
    res.json("The show has been deleted.")
})


showsRouter.put

module.exports = showsRouter;