var validator=require('validator');
var validation = {
validateRegister: (req,res,next) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    //fullnameRegex = new RegExp(`^[a-zA-Z\s,']+$`);
    passswordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$`);
    if (name=="" || email=="" || password =="") {
        //res.status(400).send("Fill up all fields correctly")
        res.status(400).json({message: "Please fill up all fields correctly"})
    } else {
        if (passswordRegex.test(password) && validator.isEmail(email)) { 
            next()
        } else {
            if (!validator.isEmail(email)) {
                res.status(400).json({message: "Please enter a valid email"})
            } else if (!passswordRegex.test(password)) {
                res.status(400).json({message: "Please choose a stronger password"})
            } else {
                res.status(400).json({message: "Please fill up all fields correctly"})
            }
        }
    }


},

validateLogin:function(req,res,next){
    //Validation code to check register form input values
    //return response with status 400 if validation fails
        //var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        passswordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$`);
        if(password=="" || email=="") {
            res.status(400).json({message: "Please fill up all fields correctly"})
        } else {
            if (passswordRegex.test(password) && validator.isEmail(email)) {
                next()
            } else {
                if (!validator.isEmail(email)) {
                    res.status(400).json({message: "Please enter a valid email"})
                } else if (!passswordRegex.test(password)) {
                    res.status(400).json({message: "Please enter a valid password"})
                } else {
                    res.status(400).json({message: "Please fill up all fields correctly"})
                }
            }
        }
    
    
},

}

module.exports = validation;