const express = require('express');
const router = express.Router();
const {getSavedPrayers, savePrayers} = require("../controllers/prayers");
const { getAnnouncements, saveAnnouncements, deleteAnnouncement } = require('../controllers/announcements');
const { saveHadith, deleteHadith, getHadith } = require('../controllers/hadith');
const { getNextPrayerAndUpdate } = require('../controllers/PrayerTimesController');


router.get('/prayers', getSavedPrayers)
router.get('/announcements', getAnnouncements)
router.get('/hadiths', getHadith)

//Body Parsing
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

router.post('/savePrayers', savePrayers)
router.post('/postAnnouncements', saveAnnouncements)
router.post('/postHadith', saveHadith)

router.put('/nextPrayers', getNextPrayerAndUpdate);

router.delete('/announcement/:index', deleteAnnouncement);
router.delete('/hadith/:index', deleteHadith);

module.exports = router;