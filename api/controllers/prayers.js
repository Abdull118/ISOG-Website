let Prayer = require('../models/prayerModel')
const mongoose = require("mongoose")

module.exports ={
    getSavedPrayers: async (req, res) => {
        try{
            let prayers = await Prayer.findOne();
            res.status(200).send(prayers)
        }catch(e){
            console.log(e)
        }
    },

    savePrayers: async(req, res)=>{
        try {
            const { fajr, dhuhr, asr, maghrib, isha } = req.body;
          
              // Find existing prayer document
              let existingPrayer = await Prayer.findOne();
          
              if (existingPrayer) {
                // Update existing prayer document
                existingPrayer.fajr = fajr;
                existingPrayer.dhuhr = dhuhr;
                existingPrayer.asr = asr;
                existingPrayer.maghrib = maghrib;
                existingPrayer.isha = isha;
          
                await existingPrayer.save();
                console.log(fajr)
                res.status(200).json(existingPrayer);
              } else {
                // Create a new prayer document
                const newPrayer = new Prayer({
                  fajr: fajr,
                  dhuhr: dhuhr,
                  asr: asr,
                  maghrib: maghrib,
                  isha: isha,
                });
          
                const savedPrayer = await newPrayer.save();
          
                res.status(201).json(savedPrayer);
              }
            } catch (error) {
              console.error('Error creating/updating prayer:', error);
              res.status(500).json({ message: 'Error creating/updating prayer' });
            }
          
    }
}