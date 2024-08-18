const mongoose = require('mongoose');
const { Schema } = mongoose;


const abonelik_urun_planlari_Schema = new Schema({
    abonelik_urun_referans_kodu: String,
    planlar: {
        plantinyum: {
            referenceCode: String,
            createdDate: Number,
            name: String,
            price: Number,
            paymentInterval: String,
            paymentIntervalCount: Number,
            trialPeriodDays: Number,
            currencyCode: String,
            productReferenceCode: String,
            planPaymentType: String,
            status: String,
            ozellikler: Array
        },
        altin: {
            referenceCode: String,
            createdDate: Number,
            name: String,
            price: Number,
            paymentInterval: String,
            paymentIntervalCount: Number,
            trialPeriodDays: Number,
            currencyCode: String,
            productReferenceCode: String,
            planPaymentType: String,
            status: String,
            ozellikler: Array
        },
        gumus: {
            referenceCode: String,
            createdDate: Number,
            name: String,
            price: Number,
            paymentInterval: String,
            paymentIntervalCount: Number,
            trialPeriodDays: Number,
            currencyCode: String,
            productReferenceCode: String,
            planPaymentType: String,
            status: String,
            ozellikler: Array
        }
    }
}, {
    timestamps: {
        createdAt: "create_at",
        updatedAt: "update_at"
    }
});
module.exports = mongoose.model('abonelik_urun_planlari', abonelik_urun_planlari_Schema);