const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/User.model");

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ mssg: "Token missing" });

    try {
        const decoded = jwt.verify(token, "Bharat");

        const user = await UserModel.findById(decoded.UserID);
        if (!user || user.tokenVersion !== decoded.tokenVersion) {
            return res.status(401).send({ mssg: "Token expired. Please login again." });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ mssg: "Invalid token" });
    }
};

module.exports = { authenticate };
