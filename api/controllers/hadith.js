let Hadith = require('../models/hadithModel')

module.exports ={
    getHadith: async (req, res) =>{
        try{
            let hadith = await Hadith.findOne();
            console.log(hadith)
            res.status(200).send(hadith)

        }catch(e){
            console.log(e)
        }
    },


    saveHadith: async (req, res) =>{
        try {
            const data = req.body;
    
            let hadith = await Hadith.findOne();
    
            if (hadith) {
                hadith = await Hadith.findByIdAndUpdate(hadith._id, data, { new: true });
            } else {
                hadith = new Hadith(data);
                await hadith.save();
            }
            res.status(200).json(hadith);
        } catch (e) {
            console.log(e);
            res.status(500).send('An error occurred while saving the announcement.');
        }
    },

    deleteHadith: async (req, res)=>{
        try {
            const index = parseInt(req.params.index);
            if (isNaN(index)) {
                return res.status(400).send('Invalid index');
            }
            const hadithDocument = await Hadith.findOne();
            if (!hadithDocument) {
                return res.status(404).send('Announcement not found');
            }
            hadithDocument.hadith.splice(index, 1);
            await hadithDocument.save();
    
            res.status(200).send('Announcement deleted successfully');
        } catch (error) {
            console.error('Error deleting announcement:', error);
            res.status(500).send('Internal Server Error');
        }
    }

}