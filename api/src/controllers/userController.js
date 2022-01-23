const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
const post = require('../models/post')
const user = require('../models/users')
const config = require('../config/config')

sgMail.setApiKey(config.sendgridkey)

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const results = await user.login(email)
        console.log(results)
        if (results.rows[0] === null) {
            return res
                .status(500)
                .json({ message: "User with email doesn't exist" })
        }
        if (bcrypt.compareSync(password, results.rows[0].password) === true) {
            const data = {
                id: results.rows[0].id,
                name: results.rows[0].name,
                token: jwt.sign({ id: results.rows[0].id }, config.JWTKey, {
                    expiresIn: 86400
                })
            }
            return res.status(200).json(data)
        }
        return res
            .status(500)
            .json({ message: 'Invalid Email/Password Combination' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const hash = await bcrypt.hash(password, 10)
        try {
            const results = await user.insert(name, email, hash)
            const msg = {
                from: 'spfacebookclone@gmail.com',
                template_id: config.sendgridwelcome,
                personalizations: [
                    {
                        to: email,
                        dynamic_template_data: {
                            firstName: name
                        }
                    }
                ]
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Confirmation Email Sent')
                })
                .catch((error) => {
                    console.error(error)
                })
            const data = {
                id: results.rows[0].id,
                name,
                token: jwt.sign({ id: results.rows[0].id }, config.JWTKey, {
                    expiresIn: 86400
                })
            }
            return res.status(201).send(data)
        } catch (issue) {
            if (issue.code === '23505') {
                return res.status(422).json({
                    message: 'User with that email already exists'
                })
            }
            console.log(issue)
            return res.status(500).json({
                message: 'Internal Server Error!'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.retrieveUserById = async (req, res) => {
    const { gottenID } = req.params
    try {
        // var getterID = req.body.getterID
        // no need yet
        const results = await user.getUserByID(gottenID)
        return res.status(201).send(results)
    } catch (error) {
        console.log(error)
        return res.status(404).send('Cannot find user with that id')
    }
}

module.exports.updateUser = (req, res) => {
    const { newName, newBio, userid } = req.body
    try {
        const results = user.updateNonSensitiveData(userid, newName, newBio)
        return res.status(200).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

module.exports.updateUserPassword = async (req, res) => {
    const { userid } = req.body
    const { newPassword } = req.body
    /*
    passswordRegex = new RegExp(
        `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$`
    )
    */
    const passswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/
    if (passswordRegex.test(newPassword)) {
        try {
            const results = user.updatePassword(userid, newPassword)
            return res.status(200).send(results)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error })
        }
    } else {
        return res.status(400).json({ message: 'password not good enough' })
    }
}

module.exports.allUsers = async (req, res) => {
    const { userid } = req.body
    try {
        const results = await user.getAll(userid)
        return res.status(200).json(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.updatePFP = async (req, res) => {
    const { userid } = req.body
    const pfp = req.body.file
    try {
        const result = await post.uploadFile(pfp)
        const cloudinaryurl = result.url
        const cloudinaryid = result.public_id
        try {
            await user.updatePFP(userid, cloudinaryurl, cloudinaryid)
            return res.status(204).json({ message: 'Post Updated!' })
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({ message: 'Error with file record updating' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error with file submission' })
    }
}

module.exports.privacyStatus = async (req, res) => {
    const { userid } = req.body
    try {
        const results = await user.getPrivacy(userid)
        return res.status(200).json(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}
