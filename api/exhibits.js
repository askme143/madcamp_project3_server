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
    var dateFrom = req.query.date_from;
    var dateTo = req.query.date_to;
    var district = req.query.district;

    const exhibitsCollection = db.db('prj3').collection("exhibits");

    var query = {}
    
    if (district.length > 0) {
        query['district'] = district;
    }
    if (dateFrom.length > 0) {
        query['start_num'] = {"$lte":parseInt(dateFrom)};
        query['finish_num'] = {"$gte":parseInt(dateFrom)};
    }
    if (dateTo.length > 0) {
        query['start_num'] = {"$lte":parseInt(dateTo)};
        query['finish_num'] = {"$gte":parseInt(dateTo)};
    }
    if (dateFrom.length > 0 && dateTo.length > 0) {
        var fromNum = parseInt(dateFrom);
        var toNum = parseInt(dateTo);

        if (fromNum > toNum) {
            const temp = fromNum;
            fromNum = toNum;
            toNum = temp;
        }

        query['start_num'] = {"$lte":fromNum};
        query['finish_num'] = {"$gte":toNum};
    }

    console.log(query);

    const result = exhibitsCollection.find(query);
    
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