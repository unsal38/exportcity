const mongoose = require('mongoose');
const { Schema } = mongoose;

const referansSchema = new Schema({
    message: {
        tr: { type: String, lowercase: true },
        en: { type: String, lowercase: true },
        fr: { type: String, lowercase: true },
        ar: { type: String, lowercase: true },
        es: { type: String, lowercase: true },
        ru: { type: String, lowercase: true },
     },
     referans_user_name: { type: String, lowercase: true },
     user_img: { type: String, lowercase: true}
},
{
    timestamps:{
        createdAt:"create_at",
        updatedAt:"update_at"
    }
}
);




module.exports = mongoose.model('referans', referansSchema);