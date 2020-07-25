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

const exhibitsPerPage = 10;

const getExhibits = (req, res, next) => {
    /* TODO: Implement various sorting */
    console.log ("> Get exhibits");

    const page = req.query.page;
    const exhibitsCollection = db.db('prj3').collection("exhibits");

    const result = exhibitsCollection.find()
    
    result.toArray((error, documents) => {
        if (error) throw error;

        const len = documents.length;
        const totalPage = parseInt(len / exhibitsPerPage)
                             + (len % exhibitsPerPage > 0 ? 1 : 0);
        const skip = (page - 1) * exhibitsPerPage;
        const end = skip + exhibitsPerPage;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send({"total_page":totalPage, "exhibits_per_page": exhibitsPerPage,
                    "exhibits" : documents.slice(skip, end)});
    })
}

module.exports = {
    getExhibits
}