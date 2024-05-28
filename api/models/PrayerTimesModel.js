// Function to fetch prayer times from the API
const getPrayerTimes = async (city, country, method) => {
    try {
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;
        const response = await fetch(url);
        const data = await response.json();
        return convertPrayerTimes(data.data.timings);
    } catch (error) {
        console.error("Error fetching prayer times:", error);
        throw error;
    }
};

// Helper function to convert prayer times
const convertPrayerTimes = (times) => {
    return {
        fajr: convertTo12Hour(times.Fajr),
        dhuhr: convertTo12Hour(times.Dhuhr),
        asr: convertTo12Hour(times.Asr),
        maghrib: convertTo12Hour(times.Maghrib),
        isha: convertTo12Hour(times.Isha)
    };
};

// Function to convert time to 12-hour format
const convertTo12Hour = (oldFormatTime) => {
    var oldFormatTimeArray = oldFormatTime.split(":");
    var HH = parseInt(oldFormatTimeArray[0]);
    var min = oldFormatTimeArray[1];

    var AMPM = HH >= 12 ? "PM" : "AM";
    HH = HH % 12;
    HH = HH ? HH : 12; // if HH is 0, set it to 12
    var hours = HH < 10 ? "0" + HH : HH;

    var newFormatTime = hours + ":" + min + " " + AMPM;
    return newFormatTime;
};

module.exports = {
    getPrayerTimes,
    // Export other functions if necessary
};
