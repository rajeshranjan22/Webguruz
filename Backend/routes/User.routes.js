const express = require("express")
const { UserModel } = require("../model/User.model")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const { isAdmin } = require("../middlewares/Admin.middleware");
const { authenticate } = require("../middlewares/Authenticate.middleware");

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send(err.message)
            } else {
                const user = new UserModel({ name, email, password: hash })
                await user.save()
                res.send({ "mssg": "New User has been Registered" })

            }
        })

    } catch (err) {
        res.send({ "mssg": "Error in Registering User", "error": err.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign(
                        { UserID: user._id, tokenVersion: user.tokenVersion },
                        "Bharat"
                    );
                    res.send({ mssg: "User has been Logged In", token });
                } else {
                    res.send({ mssg: "Password is Incorrect" });
                }
            });
        } else {
            res.send({ mssg: "Wrong Credentials" });
        }
    } catch (err) {
        res.send({ mssg: "Error in Logging In", error: err.message });
    }
});


userRouter.patch("/status/:id", authenticate, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const user = await UserModel.findByIdAndUpdate(
            id,
            {
                status,
                $inc: { tokenVersion: 1 }
            },
            { new: true }
        );
        res.send({ mssg: "User status updated", user });
    } catch (err) {
        res.status(500).send({ mssg: "Error", err: err.message });
    }
});

module.exports = {
    userRouter
}