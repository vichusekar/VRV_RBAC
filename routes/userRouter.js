const express = require("express")
const router = express.Router()
const { register, signin, resetPassword, forgotPassword, admin, moderator, user } = require('../controllers/userControl')
const { validate, adminGuard, roles } = require('../authentication/auth')

router.post('/sign-up', register)

router.post('/sign-in', signin)

router.post('/reset-password/:id', resetPassword)

router.post('/forgot-password/:id', forgotPassword)

router.get('/admin', validate, roles("admin"), adminGuard, admin)

router.get('/moderator', validate, roles("admin", "moderator"), moderator)

router.get('/user', validate, user)


module.exports = router