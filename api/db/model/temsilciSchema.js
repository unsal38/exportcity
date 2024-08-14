const mongoose = require('mongoose');
const { Schema } = mongoose;

const temsilciSchema = new Schema({
        "temsilcibilgi":{
            tr: { type: String, lowercase: true, trim: true },
            en: { type: String, lowercase: true, trim: true },
            fr: { type: String, lowercase: true, trim: true },
            ar: { type: String, lowercase: true, trim: true },
            es: { type: String, lowercase: true, trim: true },
            ru: { type: String, lowercase: true, trim: true },
          },
        
        "temsilciimg":{ type: String, lowercase: true, trim: true },
        "fnamelname":{ type: String, lowercase: true, trim: true },
        "temsilciulke":{
            tr: { type: String, lowercase: true, trim: true },
            en: { type: String, lowercase: true, trim: true },
            fr: { type: String, lowercase: true, trim: true },
            ar: { type: String, lowercase: true, trim: true },
            es: { type: String, lowercase: true, trim: true },
            ru: { type: String, lowercase: true, trim: true },
          },
          "temsilcilinkedin":{ type: String, lowercase: true, trim: true },
          "temsilcitel":{ type: String, lowercase: true, trim: true },
          "temsilcimail":{ type: String, lowercase: true, trim: true },
},{
    timestamps:{
        createdAt:"create_at",
        updatedAt:"update_at"
    }
});

class Urun extends mongoose.model{
    
}
temsilciSchema.loadClass(Urun);
module.exports = mongoose.model('temsilci', temsilciSchema);