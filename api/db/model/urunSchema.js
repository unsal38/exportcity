const mongoose = require('mongoose');
const { Schema } = mongoose;



const urunSchema = new Schema({
  uruncheck: {
      type: 'boolean',
      default: false,
  },
  userid: String,
  pricingPlanReferenceCode: String, // OLUŞTURULAN ÜRÜN REFERANS KODU PAGEADMİN EKLEYECEK
  urunhizmet: Boolean, // TRUE ÜRÜN FALSE HİZMET
  satisalis: Boolean, // true SATIŞ MI FALSE ALIŞ
  urunadi: {
      tr: { type: String, lowercase: true },
      en: { type: String, lowercase: true },
      fr: { type: String, lowercase: true },
      ar: { type: String, lowercase: true },
      es: { type: String, lowercase: true },
      ru: { type: String, lowercase: true },
  },
  aciklama: {
      tr: { type: String, lowercase: true },
      en: { type: String, lowercase: true },
      fr: { type: String, lowercase: true },
      ar: { type: String, lowercase: true },
      es: { type: String, lowercase: true },
      ru: { type: String, lowercase: true },
  },
  ulke: {
      type: String,
      uppercase: true 
  },
  sektor: String, // KATEGORİ SCHEMA
  kategori: String, // ALT KATEGORİ SCHEMA
  miktar: Number,
  serino: String,
  imgsrc: String,
  tiklanmaSayisi: {
      type: Number,
      default: 0,
  },
  red_message: String,
},{
    timestamps:{
        createdAt:"create_at",
        updatedAt:"update_at"
    }
});

// userSchema.pre("findOneAndUpdate",async function () {
//   const user =  JSON.stringify(this._conditions._id._id)
//   const userid = user.split('"')[1]
//   console.log(userid);

//   const userupdate = await userSchema.findById({_id: userid});
//   console.log(userupdate);

// })
class Urun extends mongoose.model{
    
}
urunSchema.loadClass(Urun);
module.exports = mongoose.model('urun', urunSchema);