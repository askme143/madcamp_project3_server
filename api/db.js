var mongoClient = require('mongodb').MongoClient;

const databaseURL = 'mongodb://13.125.47.50:27017'
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

const putExhibits = (req, res, next) => {
    console.log ("> Put exhibits on DB");
    console.log(req.body)

    const exhibit = req.body;

    const exhibitsCollection = db.db('exhibitsInKorea').collection('exhibits')
    
    exhibitsCollection.insertOne(exhibit, (err, result) => {})
    
    res.statusCode = 200;
    res.send("success");
}

module.exports = {
    putExhibits
}