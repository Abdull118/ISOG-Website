const mongoose = require('mongoose');

const PrayerSchema = new mongoose.Schema({
    fajr: {
        type: String,
    },
    dhuhr: {
        type: String,
    },
    asr: {
        type: String,
    },
    maghrib: {
        type: String,
    },
    isha: {
        type: String,
    },
    nextPrayer: {
        type: String
    }
});

module.exports = mongoose.model('Prayers', PrayerSchema)