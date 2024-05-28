let Announcements = require('../models/announcementsModel')

module.exports ={
    getAnnouncements: async (req, res) =>{
        try{
            let announcements = await Announcements.findOne();
            console.log(announcements)
            res.status(200).send(announcements)

        }catch(e){
            console.log(e)
        }
    },


    saveAnnouncements: async (req, res) =>{
        try {
            const data = req.body;
    
            let announcement = await Announcements.findOne();
    
            if (announcement) {
                announcement = await Announcements.findByIdAndUpdate(announcement._id, data, { new: true });
            } else {
                announcement = new Announcements(data);
                await announcement.save();
            }
            res.status(200).json(announcement);
        } catch (e) {
            console.log(e);
            res.status(500).send('An error occurred while saving the announcement.');
        }
    },

    deleteAnnouncement: async (req, res)=>{
        try {
            const index = parseInt(req.params.index);
            if (isNaN(index)) {
                return res.status(400).send('Invalid index');
            }
            const announcementDocument = await Announcements.findOne();
            if (!announcementDocument) {
                return res.status(404).send('Announcement not found');
            }
            announcementDocument.annoucements.splice(index, 1);
            await announcementDocument.save();
    
            res.status(200).send('Announcement deleted successfully');
        } catch (error) {
            console.error('Error deleting announcement:', error);
            res.status(500).send('Internal Server Error');
        }
    }

}