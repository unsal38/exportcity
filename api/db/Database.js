const mongoose = require('mongoose');
require('dotenv').config()
let instance = null;
class Database {
    constructor() {
        if (!instance) {
            this.mongoConnection = null;
            instance = this;
        }
        return instance;
    }
    async connect(option) {
        try {
            console.log("db connecting");
            let db = await mongoose.connect(option.CONNECTION_STRING);
            this.mongoConnection = db
            console.log("db connected");
        } catch (err) {
            console.error(err);
            process.exit(1);
        }

    }
}

module.exports = Database;