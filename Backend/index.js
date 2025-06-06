const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/User.routes")
const { authenticate } = require("./middlewares/Authenticate.middleware")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.use("/users", userRouter)
app.use(authenticate)

app.listen(8080, async () => {
    try {
        await connection
        console.log("Connected to DB")
    }
    catch (err) {
        console.log(err)
    }
    console.log("server is running at port 8080")
})