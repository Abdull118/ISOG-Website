// PrayerTimesController.js
const PrayerTimesModel = require('../models/PrayerTimesModel');
const PrayerModel = require('../models/prayerModel'); // Update with correct path
const moment = require('moment-timezone');

// Helper function: Convert 12-hour time to minutes
const timeToMinutes = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (hours === 12) {
        hours = 0;
    }

    if (modifier === 'PM') {
        hours += 12;
    }

    return hours * 60 + minutes;
};

// Helper function: Get the current time in minutes
const currentTimeInMinutes = () => {
    // Specify the desired time zone, e.g., 'America/Toronto' for Guelph, Canada
    const now = moment().tz('America/Toronto');
    return now.hours() * 60 + now.minutes();
};
// Function to determine the next prayer
const determineNextPrayer = (prayerTimes) => {
    const currentTime = currentTimeInMinutes();
    const timesInMinutes = Object.entries(prayerTimes).map(([prayer, time]) => {
        return { prayer, time: timeToMinutes(time) };
    });

    timesInMinutes.sort((a, b) => a.time - b.time);

    for (let i = 0; i < timesInMinutes.length; i++) {
        if (timesInMinutes[i].time > currentTime) {
            return timesInMinutes[i].prayer;
        }
    }

    return timesInMinutes[0].prayer;
};

// Main function to get the next prayer and update the database
const getNextPrayerAndUpdate = async (req, res) => {
    try {
        // Directly call getPrayerTimes function without instantiating
        const prayerTimes = await PrayerTimesModel.getPrayerTimes("Guelph", "Canada", 2);
        const nextPrayer = determineNextPrayer(prayerTimes);

        let existingPrayer = await PrayerModel.findOne();
        if (existingPrayer) {
            await PrayerModel.updateOne({ _id: existingPrayer._id }, { nextPrayer: nextPrayer });
            res.json({ nextPrayer });
        } else {
            res.status(404).send("No existing prayer document found");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error occurred");
    }
};

module.exports = {
    getNextPrayerAndUpdate,
    // other exports if necessary
};