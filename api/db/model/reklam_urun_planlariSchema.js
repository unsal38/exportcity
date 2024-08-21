const mongoose = require('mongoose');
const { Schema } = mongoose;


const reklam_urun_planlari_Schema = new Schema({
    abonelik_urun_referans_kodu: String,
    planlar: {
        ay1: {
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
        ay3: {
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
        ay12: {
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
module.exports = mongoose.model('reklam_urun_planlari', reklam_urun_planlari_Schema);