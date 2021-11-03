var validator=require('validator');
var validation = {
validateRegister: (req,res,next) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    fullnameRegex = new RegExp(`^[a-zA-Z\s,']+$`);
    passswordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$`);
    if (fullnameRegex.test(name) && passswordRegex.test(password) && validator.isEmail(email)) {
        next()
    } else {
        res.status(400).json({message: "Fill up all fields correctly"})
    }


}

}

module.exports = validation;