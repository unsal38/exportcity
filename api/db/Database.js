const mongoose = require('mongoose');
let instance = null;
class Database {
    constructor(){
        if(!instance){
            this.mongoConnection = null;
            instance = this;
        }
        return instance;
    }
    async connect (option){
        let db = await mongoose.connect(option.CONNECTİON_STRİNG);
        this.mongoConnection = db
    }
}

module.exports = Database;