const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    database: process.env.DBNAME,
    JWTKey: process.env.JWTKEY,
    cloudinaryname: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinarykey: process.env.CLOUDINARY_API_KEY,
    cloudinarysecret: process.env.CLOUDINARY_API_SECRET,
    sendgridkey: process.env.SENDGRID_API_KEY,
    sendgridwelcome: process.env.SENDGRID_WELCOME
}
