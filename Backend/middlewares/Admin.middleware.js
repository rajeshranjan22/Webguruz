const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).send({ mssg: "Access denied" });
    }
    next();
};

module.exports = { isAdmin };
