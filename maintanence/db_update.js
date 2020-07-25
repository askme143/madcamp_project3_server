function updateExhibitsImage(db) {
    const exhibitsCollection = db.db('prj3').collection('exhibits');

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

var mongoClient = require('mongodb').MongoClient;

const databaseURL = 'mongodb://localhost:27017';

mongoClient.connect(databaseURL,
    (error, database) => {
        if (error) {
            console.log('db connection error');
            return;
        }

        console.log('db was connected : ' + databaseURL);
        updateExhibitsImage(database);
    }
);