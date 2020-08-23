function updateExhibitsImage(db) {
    const exhibitsCollection = db.db('exhibitsInKorea').collection('exhibits');

    const result = exhibitsCollection.find();

    result.toArray((error, documents) => {
        console.log(error);

        const len = documents.length;
        for (var i = 0; i < len ; i++) {
            var url = documents[i].thumb_url;
            url =  url.split("144x200");
            if (url.length == 1)
                continue;
            
            url = url[0] + "256x368" + url[1];

            exhibitsCollection.updateOne({"_id":documents[i]._id},
                {$set: {"thumb_url":url}});
        }
    });
}
function updateDateNum(db) {
    const exhibitsCollection = db.db('exhibitsInKorea').collection('exhibits');

    const result = exhibitsCollection.find();

    result.toArray((error, documents) => {
        console.log(error);

        const len = documents.length;
        for (var i = 0; i < len ; i++) {
            const startY = documents[i].start_y;
            const startM = documents[i].start_m;
            const startD = documents[i].start_d;

            const finishY = documents[i].finish_y;
            const finishM = documents[i].finish_m;
            const finishD = documents[i].finish_d;

            exhibitsCollection.updateOne({"_id":documents[i]._id},
                {$set: {"start_num":startY * 10000 + startM * 100 + startD,
                        "finish_num":finishY * 10000 + finishM * 100 + finishD}});
        }
    });
}

var mongoClient = require('mongodb').MongoClient;

const databaseURL = 'mongodb://13.125.47.50:27017';
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

const updateDistrict = (req, res, next) => {
    const exhibit = req.body;

    const exhibitsCollection = db.db('exhibitsInKorea').collection('exhibits')
    
    exhibitsCollection.insertOne(exhibit, (err, result) => {
        if (err) {
            exhibitsCollection.updateOne({"title":exhibit.title},
                {$set: {"district": exhibit.district}});
        }
    })
    
    res.statusCode = 200;
    res.send("success");
}

module.exports = {
    updateDistrict
}