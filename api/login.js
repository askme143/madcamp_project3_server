var mongoClient = require('mongodb').MongoClient;

const databaseURL = 'mongodb://localhost:27017'
var db;

mongoClient.connect(databaseURL,
    (error, database) => {
        if (error) {
            console.log('db connection error');
            return;
        }

        console.log('db was connected : ' + databaseURL);
        db = database;
    }
);


const checkUser = (req, res, next) => {
    console.log("> Checking user access");
    
    const {fb_id, name} = req.body;
    const user = {fb_id, name};
    
    var users = db.db('myDB').collection('user');
    var result = users.find({'name': name, 'fb_id': fb_id});
    
    result.toArray((error, documents) => {
        if (error) {
            console.log("Error: checkUser");

            throws (error);
        } else if (documents.length > 0) {
            console.log("Login success");

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send("success");
        } else {
            console.log("Login failed");

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send("failed");
        }
    })
};

const signUpUser = (req, res, next) => {
    console.log("> Sign up process started");

    const {fb_id, name} = req.body;
    const user = {fb_id, name};

    var users = db.db('myDB').collection('user');
    var result = users.find({'name': name, 'fb_id': fb_id});

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

function queryStringToJSON(qs) {
    qs = qs || location.search.slice(1);

    var pairs = qs.split('&');
    var result = {};
    pairs.forEach(function(p) {
        var pair = p.split('=');
        var key = pair[0];
        var value = decodeURIComponent(pair[1] || '');

        if( result[key] ) {
            if( Object.prototype.toString.call( result[key] ) === '[object Array]' ) {
                result[key].push( value );
            } else {
                result[key] = [ result[key], value ];
            }
        } else {
            result[key] = value;
        }
    });

    return JSON.parse(JSON.stringify(result));
};

module.exports = {
    checkUser,
    signUpUser
}