const mongoose = require('mongoose');
const { Schema } = mongoose;



const userSchema = new Schema({
  mailCheck: {
    type: Boolean,
    default: false,
  },  // SONRASINDA EKLENECEK
  refkod: String, // KENDİ REFERANS KODU
  refleshToken: String,
  favoriurun: {type:Object},

  // ROLE İŞLEMLERİ //////////////////////////////////////////////////////////////////
  uyeRole: {
    type: String,
    enum: ["user","pageadmin","employee","reklamcheck","uruncheck","odemecheck","uyecheck","blogcheck","seocheck" ]
  },
  uyeRolePreminyum: {
    type: String,
    default: "standart",
    enum: ["standart", "bronz", "gumus", "altin"]
  },
  uyelikDate: Date, // UYELİK BİTİŞ TARİHİ
  // UYELİK ROLU - STANDART(para ödememiş üye) - PREMİNYUM (BRONZ - GÜMÜŞ - ALTIN ) - employee (FİRMA ADINA ÇALIŞAN ) - PAGEADMİN (UĞUR) -ADMİN (YAZILIMCI)
  /// ÜYE ROLÜ SEÇİLDİĞİNDE AŞAĞIDAKİLERDE OTOMOTİK BELİRLENMESİ LAZIM////////////////////////////////
  // ROLE İŞLEMLERİ ////////////////////////////////////////

    // CHECK İŞLEMLERİ
  uyeUrunHizmetGirmeGorme: {
    type: Object
  }, // KULLANICI URUN HİZMET GÖRME SAYISI 
  maxuyeUrunHizmetGirmeGorme: {
    type: Number,
    default: 0
  },
  uyeReklamDate: Date, // UYE REKLAM VERDİĞİNDE SONLANACAĞI TARİH
  uyeReklamOlusturma: {
    type: Boolean,
    default: false,
  },
  // CHECK İŞLEMLERİ

  // PERSONEL BİLGİLERİ
  fname: { type: String, lowercase: true }, // PERSONEL ADI
  lname: { type: String, lowercase: true }, // PERSONEL SOYADI
  email: { type: String, lowercase: true }, //PERSONEL MAİL
  pass: String, //PERSONEL ŞİFRE
  regRefcod: String, // ÜYE OLURKEN KULLANDIĞI REFERANS KODU
  // PERSONEL BİLGİLERİ

  // ABONELİK OLUŞTURMA BİLGİLERİ
  identityNumber: String, // TC NUMARASI
  ulkeKodu: String, // ALAN KODU WHATSUP NUMARASI İÇİN
  gsmNumber: String, // UYE TELEFON NUMARASI
  billingAddressCity: { type: String, lowercase: true }, // UYE ŞEHİR İSTANBUL
  billingAddressDistrict: { type: String, lowercase: true }, // UYE İLÇE ALTUNİZADE
  billingAddressCountry: { type: String, lowercase: true }, // UYE ÜLKE TÜRKİYE KAYIT OLUNAN ÜLKE
  billingAddressAddress: { type: String, lowercase: true }, // UYE AÇIK ADRESİ
  // ABONELİK OLUŞTURMA BİLGİLERİ

  // FİRMA BİLGİLERİ
  sektor: String,
  logo: String,
  firmaUnvani: { type: String, lowercase: true },
  firmaVergiNumarasi: String,
  markaismi: { type: String, lowercase: true },
  hakkimizda: {
    tr: { type: String, lowercase: true, trim: true },
    en: { type: String, lowercase: true, trim: true },
    fr: { type: String, lowercase: true, trim: true },
    ar: { type: String, lowercase: true, trim: true },
    es: { type: String, lowercase: true, trim: true },
    ru: { type: String, lowercase: true, trim: true },
  },
  bilgi_bolum: {
    tr: { type: String, lowercase: true, trim: true },
    en: { type: String, lowercase: true, trim: true },
    fr: { type: String, lowercase: true, trim: true },
    ar: { type: String, lowercase: true, trim: true },
    es: { type: String, lowercase: true, trim: true },
    ru: { type: String, lowercase: true, trim: true },
  },
  ekatalog_iframe: {type: String,},
  diger_bilgiler: {type: String,lowercase: true},
  // FİRMA BİLGİLERİ

  /// ÖDEME SONRASINDA EKLENECEK PARAMETRE //////////////////////////////////
  // İYZCO PAREMETRELERİ //
  referenceCode: String, // İYZCO MÜŞTERİ OLUŞTURULDUĞUNDA MÜŞTERİYE AİT REFERANS KODU // SORGULARKEN customerReferenceCode

  // //İLK ÖDEME ALINDIĞINDA  PARAMETRELER 
  // parentReferenceCode: String, // Abonelik güncellemelerinde üye işeyerinin eşleştirme yapılabileceği eşsiz referans kodu
  // pricingPlanReferenceCode: String, // Aboneliğe ait plan referans kodu
  // customerReferenceCode: String, // PARA ÇEKİLDİĞİNDE  OLUŞUYOR PARAMETRE OLARAK VERİLİYOR
  // subscriptionStatus: String, // Abonelik durumunu gösterir.
  // trialDays: String, // Integer Ödeme planında belirlenen deneme süresidir. Bu süreç boyunca karttan ödeme alınmaz
  // trialStartDate: Date, // Deneme süresinin başlangıç tarihini gösteren unix timestamp değeridir
  // trialEndDate: Date, // Deneme süresinin bitiş tarihini gösteren unix timestamp değeridir
  // createdDate: Date, // Abonelik oluşturulma tarihinin unix timestamp değeridir
  // startDate: Date, // Abonelik başlangıç tarihinin unix timestamp değeridir
  // // İYZCO PAREMETRELERİ //


  /////////////////////// SONRADAN EKLENECEK PARAMETRE //////////////////////////////////

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
class User extends mongoose.model{
    
}
userSchema.loadClass(User);
module.exports = mongoose.model('user', userSchema);