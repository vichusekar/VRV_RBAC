const mongoose = require("mongoose")

function validateEmail(e) {
    let EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return EmailPattern.test(e)
}

function validatePassword(e) {
    let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordPattern.test(e)
}

let userSchema = new mongoose.Schema({

    username: { type: String, required: true },

    email: { type: String, required: true, validate: { validator: validateEmail, message: "Enter valid email" } },

    password: { type: String, required: true, validate: { validator: validatePassword, message: "Enter valid password" } },

    role: { type: String, enum: ['admin', 'user', 'moderator'] }

}, { collection: "users", versionKey: false })

let userModel = mongoose.model("users", userSchema)

module.exports = userModel