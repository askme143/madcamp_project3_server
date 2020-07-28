var mongoClient = require('mongodb').MongoClient;

const databaseURL = 'mongodb://localhost:27017'
var db;

mongoClient.connect(databaseURL,
    (error, database) => {
        if (error) {
            console.log('db connection error');
            console.log(error);
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
    var early = req.query.early_date;
    var late = req.query.late_date;
    var name = req.query.search_name;

    const exhibitsCollection = db.db('prj3').collection("exhibits");

    var query = {}
    
    if (district.length > 0) {
        query['district'] = district;
    }
    if (early.length > 0) {
        query['start_num'] = {"$gt":parseInt(early)};
        // query['finish_num'] = {"$gte":parseInt(dateFrom)};
    }
    if (late.length > 0 ) {
        query['finish_m'] = {"$eq":parseInt(late.substring(4,6))};
        query['finish_num'] = {"$gte":parseInt(late)};
    }
    if (dateFrom.length > 0) {
        query['start_num'] = {"$lte":parseInt(dateFrom)};
        query['finish_num'] = {"$gte":parseInt(dateFrom)};
    }
    if (dateTo.length > 0) {
        query['start_num'] = {"$lte":parseInt(dateTo)};
        query['finish_num'] = {"$gte":parseInt(dateTo)};
    }
    if(name.length>0){
        query['title'] = {"$regex":name};
        //  query = {"$or" : [ query['title'] = {"$regex":name}, 
        // query['place'] = {"$regex":name} ] };
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


const getEarlyExhibits = (req, res, next) => {
    /* TODO: Implement various sorting */
    console.log ("> Get early exhibits");
    var early = req.query.early_date;
    var late = req.query.late_date;

    const exhibitsCollection = db.db('prj3').collection("exhibits");

    var query = {}

    if (early.length > 0) {
        query['start_num'] = {"$gt":parseInt(early)};
        // query['finish_num'] = {"$gte":parseInt(dateFrom)};
    }
    if (late.length > 0) {
        query['finish_m'] = {"$eq":parseInt(late.substring(4,6))};
        query['finish_num'] = {"$gte":parseInt(late)};

    }

    console.log(query);

    // query['start_num'] = {"$lte":fromNum};
    const result = exhibitsCollection.find(query);
    
    result.toArray((error, documents) => {
        // if (error) throw error;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send({ "exhibits" : documents});
    })
}

module.exports = {
    getExhibits,
    getEarlyExhibits
}