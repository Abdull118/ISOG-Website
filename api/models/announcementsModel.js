const mongoose = require('mongoose');

const AnnouncementsSchema = new mongoose.Schema({
    annoucements: [
        {
          type: String,
        }
      ]
});

module.exports = mongoose.model('Announcements', AnnouncementsSchema)