const validator = require('validator')

const validation = {
    validateRegister: (req, res, next) => {
        const { name } = req.body
        const { email } = req.body
        const { password } = req.body
        /*
        const passswordRegex = new RegExp(
            `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$`
        )
        */
        const passswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/
        if (name === '' || email === '' || password === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            })
        } else if (passswordRegex.test(password) && validator.isEmail(email)) {
            next()
        } else if (!validator.isEmail(email)) {
            res.status(400).json({
                message: 'Please enter a valid email'
            })
        } else if (!passswordRegex.test(password)) {
            res.status(400).json({
                message: 'Please choose a stronger password'
            })
        } else {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            })
        }
    },

    validateLogin(req, res, next) {
        const { email } = req.body
        const { password } = req.body
        /*
        const passswordRegex = new RegExp(
            `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$`
        )
        */
        const passswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/
        if (password === '' || email === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            })
        } else if (passswordRegex.test(password) && validator.isEmail(email)) {
            next()
        } else if (!validator.isEmail(email)) {
            res.status(400).json({
                message: 'Please enter a valid email'
            })
        } else if (!passswordRegex.test(password)) {
            res.status(400).json({
                message: 'Please enter a valid password'
            })
        } else {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            })
        }
    },

    validateText: (req, res, next) => {
        const { content } = req.body
        const { userid } = req.body
        if (userid === null || userid === '') {
            res.status(401).json({ message: 'Please login first' })
        } else if (content === null || !content.trim().length) {
            res.status(400).json({ message: 'Your post is empty' })
        } else {
            next()
        }
    },

    validateImage: (req, res, next) => {
        const { file } = req.body
        const { userid } = req.body

        if (userid === null || userid === '') {
            res.status(401).json({ message: 'Please login first' })
        } else if (file === null || file === []) {
            res.status(400).json({ message: 'Please upload a file' })
        } else {
            console.log(file.path)
            if (
                file.path.endsWith('.png') ||
                file.path.endsWith('.jpg') ||
                file.path.endsWith('.jpeg') ||
                file.path.endsWith('.gif') ||
                file.path.endsWith('.PNG') ||
                file.path.endsWith('.JPG') ||
                file.path.endsWith('.JPEG') ||
                file.path.endsWith('.GIF')
            ) {
                next()
            } else {
                res.status(400).json({
                    message: 'Only png, jpg and gif files are allowed'
                })
            }
        }
    },

    validateVideo: (req, res, next) => {
        const { file } = req.body
        const { userid } = req.body

        if (userid === null || userid === '') {
            res.status(401).json({ message: 'Please login first' })
        } else if (file === null || file === []) {
            res.status(400).json({ message: 'Please upload a file' })
        } else {
            console.log(file.path)
            if (file.path.endsWith('.mp4') || file.path.endsWith('.mov')) {
                next()
            } else {
                res.status(400).json({
                    message: 'Only mp4 and mov files are allowed'
                })
            }
        }
    },

    validateAllMedia: (req, res, next) => {
        var files = req.body.files;
        var userid = req.body.userid;
        if (userid == null || userid == "") {
            res.status(401).json({ message: "Please login first" })
        } else {
            if (files == null || files == []) {
                res.status(400).json({ message: "Please upload a file" })
            } else {
                for (var i = 0; i < files.length; i++) {
                    console.log(files[i].path)
                    if (files[i].path.endsWith(".mp4") || files[i].path.endsWith(".mov") || files[i].path.endsWith(".MP4") || files[i].path.endsWith(".MOV") || files[i].path.endsWith(".png") || files[i].path.endsWith(".jpg") || files[i].path.endsWith(".jpeg") || files[i].path.endsWith(".gif") || files[i].path.endsWith(".PNG") || files[i].path.endsWith(".JPG") || files[i].path.endsWith(".JPEG") || files[i].path.endsWith(".GIF")) {
                    } else {
                        res.status(400).json({ message: `Only png, jpg, jpeg, gif, mp4 and mov files are allowed. check the files ` })
                    }
                }
                next()
            }
        }

    }
}

module.exports = validation
