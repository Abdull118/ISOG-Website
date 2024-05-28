const mongoose = require('mongoose');

const HadithSchema = new mongoose.Schema({
    hadith: [
        {
          type: String,
        }
      ]
});

module.exports = mongoose.model('Hadith', HadithSchema)