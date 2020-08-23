var mongoClient = require('mongodb').MongoClient;

const databaseURL = 'mongodb://13.125.47.50:27017';
var db;

mongoClient.connect(databaseURL,
    (error, database) => {
        if (error) {
            console.log('db connect error');
            return;
        }

        console.log('db was connected : ' + databaseURL);
        db = database;
    }
);

const checkNaver = (req, res, next) => {
    console.log("> Checking user access");
    
    const email = req.query.email;
    console.log(email);
    
    var users = db.db('exhibitsInKorea').collection('users');
    users.findOne({'email':email}, (error, document) => {
        if (error) throw error;

        console.log(document);

        if (document != null) {
            req.session.logined = true;
            req.session.email = email;
            res.statusCode = 200;
            res.send("success");
        } else {
            res.statusCode = 200;
            res.send("fail");
        }
    });
};

const signupUser = (req, res, next) => {
    console.log("> Sign up process started");

    const {email, password, name} = req.body;
    const user = {email, password, name};

    var users = db.db('exhibitsInKorea').collection('users');
    var result = users.find({'email': email});

    result.toArray((error, documents) => {
        if (error) {
            throws (error);
        } else if (documents.length > 0) {
            console.log ('find user [ ' + documents + ' ]');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send("failed");
        } else {
            res.statusCode = 200;

            users.insertOne(user, (error, result) => {
                if (error) throw error;
                
                console.log("SginUP: Insert \n" + user.name + "\n in USERS collection successfully");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.send("success");
            })
        }
    })
}

const loginCheck = (req, res, next) => {
    if (req.session.logined) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.send("success");
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.send("failed");
    }
}

const logout = (req, res, next) => {
    req.session.destroy();

    res.clearCookie('sid');
}

module.exports = {
    checkNaver,
    signupUser,
    loginCheck,
    logout
}