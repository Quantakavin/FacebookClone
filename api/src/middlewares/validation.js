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

validateText: (req,res,next) => {
    var content = req.body.content;
    var userid = req.body.userid;
    if (userid == null || userid == "") {
        res.status(401).json({message: "Please login first"})
    } else {
        if(content == null || !content.trim().length) {
            res.status(400).json({message: "Your post is empty"})
        } else {
            next()
        }
    }
},

validateImage: (req,res,next) => {
    var file = req.body.file;
    var userid = req.body.userid;
    
    if (userid == null || userid == "") {
        res.status(401).json({message: "Please login first"})
    } else {
        if(file == null || file==[]) {
            res.status(400).json({message: "Please upload a file"})
        } else {
            console.log(file.path)
            if (file.path.endsWith(".png") || file.path.endsWith(".jpg") || file.path.endsWith(".jpeg") || file.path.endsWith(".gif")) {
                next()
            } else {
                res.status(400).json({message: "Only png, jpg and gif files are allowed"})
            }
        }
    }
},

validateImageForProfile: (req,res,next) => {
    var file = req.body.file;
    var userid = req.body.userid;
    
    if (userid == null || userid == "") {
        res.status(401).json({message: "Please login first"})
    } else {
        if(file == null || file==[]) {
            next()
        } else {
            console.log(file.path)
            if (file.path.endsWith(".png") || file.path.endsWith(".jpg") || file.path.endsWith(".jpeg") || file.path.endsWith(".gif")) {
                next()
            } else {
                res.status(400).json({message: "Only png, jpg and gif files are allowed"})
            }
        }
    }
}


}

module.exports = validation;