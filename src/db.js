const { MongoClient, ObjectId } = require('mongodb');
let db;

const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
client.connect()
    .then(() => {
        db = client.db('couponCodes_app');
        console.log('Connected to DB')
    })
    .catch((e) => console.log('Could not connect to MongoDB', e));
function getDb() {
    return db;
}

module.exports = {db: getDb}