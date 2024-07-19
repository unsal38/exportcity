const mongoose = require('mongoose');
const { Schema } = mongoose;



const sektorSchema = new Schema({
  sektor: {
     tr: { type: String, lowercase: true },
     en: { type: String, lowercase: true },
     fr: { type: String, lowercase: true },
     ar: { type: String, lowercase: true },
     es: { type: String, lowercase: true },
     ru: { type: String, lowercase: true },
  }
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
class Kategori extends mongoose.model{
    
}
sektorSchema.loadClass(Kategori);
module.exports = mongoose.model('sektor', sektorSchema);