const mongoose = require('mongoose');
const { Schema } = mongoose;



const siteHeaderSchema = new Schema({
  anasayfa: {
      titleTr: { type: String},
      titleEn: { type: String},
      titleFr: { type: String},
      titleAr: { type: String},
      titleEs: { type: String},
      titleRu: { type: String},
      descriptionTr: { type: String},
      descriptionEn: { type: String},
      descriptionFr: { type: String},
      descriptionAr: { type: String},
      descriptionEs: { type: String},
      descriptionRu: { type: String},
      robots: { type: String, default: "index, follow" },

  },
  blog: {
      titleTr: { type: String},
      titleEn: { type: String},
      titleFr: { type: String},
      titleAr: { type: String},
      titleEs: { type: String},
      titleRu: { type: String},
      descriptionTr: { type: String},
      descriptionEn: { type: String},
      descriptionFr: { type: String},
      descriptionAr: { type: String},
      descriptionEs: { type: String},
      descriptionRu: { type: String},
      robots: { type: String},

  },
  firma: {
      titleTr: { type: String},
      titleEn: { type: String},
      titleFr: { type: String},
      titleAr: { type: String},
      titleEs: { type: String},
      titleRu: { type: String},
      descriptionTr: { type: String},
      descriptionEn: { type: String},
      descriptionFr: { type: String},
      descriptionAr: { type: String},
      descriptionEs: { type: String},
      descriptionRu: { type: String},
      robots: { type: String},

  },
  urunlistele: {
      titleTr: { type: String},
      titleEn: { type: String},
      titleFr: { type: String},
      titleAr: { type: String},
      titleEs: { type: String},
      titleRu: { type: String},
      descriptionTr: { type: String},
      descriptionEn: { type: String},
      descriptionFr: { type: String},
      descriptionAr: { type: String},
      descriptionEs: { type: String},
      descriptionRu: { type: String},
      robots: { type: String},

  },
  panel: {
      titleTr: { type: String, default: "E-Exportcity"},
      descriptionTr: { type: String, default: "E-Exportcity"},
      robots: { type: String, default: "noindex, nofollow" },
  },
  register: {
      titleTr: { type: String, default: "E-Exportcity"},
      descriptionTr: { type: String, default: "E-Exportcity"},
      robots: { type: String, default: "noindex, nofollow" },

  },
  login: {
      titleTr: { type: String, default: "E-Exportcity"},
      descriptionTr: { type: String, default: "E-Exportcity"},
      robots: { type: String, default: "noindex, nofollow" },
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
class SiteHeader extends mongoose.model{
    
}
siteHeaderSchema.loadClass(SiteHeader);
module.exports = mongoose.model('siteHeader', siteHeaderSchema);