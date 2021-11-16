const connection = require('../config/database'); 
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'db9b4ixhd', 
    api_key: '217122897999788', 
    api_secret: 'YMrgc-rB2Rhbeqk8_3kip_9rkhc' 
});

module.exports.insertText = (userid, content, callback) => {
    const insertPostQuery = `INSERT INTO post (type, user_id, content, date) VALUES ($1, $2, $3, current_timestamp) RETURNING id;`;
    connection.query(insertPostQuery, ["text", userid,content])
    .then(returnid => {
        callback(returnid, null)
    })
    .catch(err => {
        console.log(err)
        callback(null, err)
    })
} 

module.exports.uploadFile = (file, callback) => {
    cloudinary.uploader.upload(file.path, { upload_preset: 'image_upload' })
    .then((result) => {
        //let data = { imageURL: result.url, publicId: result.public_id, status: 'success' };
        callback(result, null);
    }).catch((error) => {
        console.log(error)
        callback(null, error);
    });

}

module.exports.insertImage = (userid, caption, cloudinaryurl, cloudinaryid, callback) => {
    const insertPostQuery = `INSERT INTO post (type, user_id, caption, cloudinaryurl, cloudinaryid, date) VALUES ($1, $2, $3, $4, $5, current_timestamp) RETURNING id;`;
    connection.query(insertPostQuery, ["image", userid, caption, cloudinaryurl, cloudinaryid])
    .then(returnid => {
        callback(returnid, null)
    })
    .catch(err => {
        console.log(err)
        callback(null, err)
    })
} 
