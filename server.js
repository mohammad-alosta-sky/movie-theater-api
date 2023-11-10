const express = require("express");
const {db} = require("./db/connection")
const usersRouter = require("./routers/users");
// const showsRouter = require("./routers/shows")


const port = 3000;
const app = express()


app.use(express.json())
app.use("/users", usersRouter);
// app.use("/shows", showsRouter);


app.listen(port,() => {
    db.sync()
    console.log("http://localhost:3000")
})

