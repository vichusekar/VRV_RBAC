const userModel = require("../models/userModel")
const nodemailer = require("nodemailer")
const { hashPassword, comparePassword, createToken, validate, roles } = require("../authentication/auth")


const register = ('/sign-up', async (req, res) => {
    let { username, email, password, role } = req.body
    try {
        let user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            req.body.password = await hashPassword(req.body.password)
            let newUser = await userModel.create(req.body)
            res.status(201).send({ message: "Register Successfully", newUser })

        } else {
            res.status(400).send({ message: `User with ${req.body.email} already exist` })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

const signin = ('/sign-in', async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })
        if (user) {
            if (await comparePassword(req.body.password, user.password)) {
                let token = await createToken(user)
                res.status(200).send({ message: "Login Successfully", token })
            } else {
                res.status(400).send({ message: "Invalid Credentials" })
            }
        } else {
            res.status(404).send({ message: `User with email ${req.body.email} does not exist` })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

const forgotPassword = ('/forgot-password/:id', async (req, res) => {
    try {
        const oldUser = await userModel.findOne({ email: req.body.email })
        if (oldUser) {
            const passwordLink = `http://localhost:3000/${oldUser._id}`

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vigneshecom093@gmail.com',
                    pass: 'kznv npox aaxy nnvp'
                }
            })

            var mailOptions = {
                from: 'vigneshmsho093@gmail.com',
                to: req.body.email,
                subject: 'Reset your password ',
                text: `Kindly visit the link and change your password ${passwordLink}`,
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            res.status(200).send({ message: 'Email Sent Successfully' })

        }

        else {
            res.status(404).send({ message: `User with ${req.body.email} doesn't exists`, error: error?.message })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })

    }
})

const resetPassword = ('/reset-password/:id', async (req, res) => {
    try {
        let user = await userModel.findById({ _id: req.params.id })
        if (user) {
            user.password = await hashPassword(req.body.password)
            user.save()
            res.status(200).send({ message: "Password Updated Successfullly" })
        }
        else {
            res.status(404).send({ message: `User not found` })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

const admin = ('/admin', async (req, res) => {
    try {
        res.status(200).send({ message: "welcome admin" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

const moderator = ('/moderator', async (req, res) => {
    try {
        res.status(200).send({ message: "welcome moderator" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

const user = ('/user', async (req, res) => {
    try {
        res.status(200).send({ message: "welcome user" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

module.exports = { register, signin, forgotPassword, resetPassword, admin, moderator, user }