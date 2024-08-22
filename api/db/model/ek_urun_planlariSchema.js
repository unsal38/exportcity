const mongoose = require('mongoose');
const { Schema } = mongoose;


const ek_urun_planlari_Schema = new Schema({
    abonelik_urun_referans_kodu: String,
    planlar: {
        ay50: {
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
        ay100: {
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
        ay1000: {
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
module.exports = mongoose.model('ek_urun_planlari', ek_urun_planlari_Schema);