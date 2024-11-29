const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

let hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

let comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

let createToken = async (username, role, email) => {
    let token = await jwt.sign(
        { username, role, email },
        process.env.JWT_SK,
        { expiresIn: process.env.JWT_EXPIRE }
    )
    return token
}


let decodeToken = async (token) => {
    return jwt.decode(token)
}

let validate = async (req, res, next) => {
    if (req.headers.authorization) {
        let token = await req?.headers?.authorization?.split(" ")[1]
        let data = await decodeToken(token)
        if (token) {
            if ((Math.round((+new Date() / 1000))) < data.exp) {
                next()
            } else {
                res.status(404).send({ message: "Token has expired" })
            }
            console.log(token)
        } else {
            res.status(404).send({ message: "Token nott found" })
        }
    }

}

let roles = (...userRoles) => {
    return (req, res, next) => {
        if (!userRoles.includes({role: req.body.role})) {
            return res.status(403).send({ message: "Access Denied" });
        }
        next();
    };
};


let adminGuard = async (req, res, next) => {
    const authHeader = req?.headers?.authorization || req?.headers?.Authorization;

    if (!authHeader) {
        return res.status(401).send({ message: "Authorization header missing" });
    }
    const token = await authHeader.split(" ")[1]
    console.log(req)
    try {
        if (token) {
            let decodedToken = async (token) => jwt.verify(token, process.env.JWT_SK)
            let { role } = await decodedToken(token)
            try {
                if (role === 'admin') {
                    return next()
                }
            } catch (err) {
                console.log(err)
                res.status(404).send({ message: "Only admin can access", err: err?.message })
            }
            console.log(token)
        }
    } catch (err) {
        res.status(404).send({ message: "Token not found", err: err?.message })

    }

}


module.exports = { hashPassword, createToken, comparePassword, validate, adminGuard, roles }
