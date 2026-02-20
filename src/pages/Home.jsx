import {useEffect, useState, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Home.css'
import { fetchPrayerTimes } from '../store/slices/iqamahTimesSlice';
import { fetchAthanTimes } from '../store/slices/prayerTimesSlice';
import moment from 'moment/moment';
import sunrise from '../images/sunrise2.svg'
import sunset from '../images/sunset2.svg'
import mail from '../images/mail.svg'
import phone from '../images/phone.svg'
import pin from '../images/pin.svg'
import masjid from '../images/masjidNight.jpeg'
import mosqueVector from '../images/mosque.svg'
import ramadanCalendar from '../images/ramadanCalendar26.jpg'

const RAMADAN_CALENDAR_DRIVE_URL = 'https://drive.google.com/uc?export=download&id=1puLtEVF7XMUdiM7rUwbBnLP2fmeoWtgT'

const getSeasonalGreeting = (hijriMonth, hijriDay) => {
  if (hijriMonth === 9) {
    return { message: 'Ramadan Mubarak!', type: 'ramadan' };
  }

  if (hijriMonth === 10 && hijriDay <= 3) {
    return { message: 'Eid Mubarak!', type: 'eid' };
  }

  return { message: '', type: '' };
};


const Home = () => {

  const dispatch = useDispatch();
  const iqamahTimes = useSelector((state) => state.iqamahTimes);
  const prayerTimes = useSelector((state) => state.prayerTimes);

  useEffect(() => {
    dispatch(fetchPrayerTimes());
    dispatch(fetchAthanTimes())
  }, [dispatch]);

  const [currentHijriDay, setCurrentHijriDay] = useState()
  const [currentHijriMonth, setCurrentHijriMonth] = useState()
  const [currentHijriYear, setCurrentHijriYear] = useState()
  const [currentDate, setCurrentDate] = useState()
  const [greeting, setGreeting] = useState('')
  const [greetingType, setGreetingType] = useState('')

  const getDate = () => {
    var today = new Date(),
    date = (today.getDate())  + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    setCurrentDate(date)
  };

  const getHijriDate = useCallback(async () => {
    try {
     const response = await fetch(`https://api.aladhan.com/v1/gToH?date=${currentDate}`);
     const json = await response.json();
     setCurrentHijriDay(json.data.hijri.day)
     setCurrentHijriMonth(json.data.hijri.month.ar)
     setCurrentHijriYear(json.data.hijri.year)
     
     // Determine greeting based on Hijri date
     const hijriMonth = parseInt(json.data.hijri.month.number);
     const hijriDay = parseInt(json.data.hijri.day);
     const seasonalGreeting = getSeasonalGreeting(hijriMonth, hijriDay);

     setGreeting(seasonalGreeting.message);
     setGreetingType(seasonalGreeting.type);
   } catch (error) {
     console.log(error)
   }
 }, [currentDate])



const [prayerClasses, setPrayerClasses] = useState({
  fajr: '',
  dhur: '',
  asr: '',
  maghrib: '',
  isha: '',
});

const updatePrayerClasses = useCallback(() => {
  const now = new Date();
  let newClasses = { fajr: 'defaultPrayer', dhur: 'defaultPrayer', asr: 'defaultPrayer', maghrib: 'defaultPrayer', isha: 'defaultPrayer' };

  // Convert current time to a 24-hour format string for comparison
  const currentTimeStr = convertTo24Hour(`${now.getHours()}:${now.getMinutes()}`);

  // Convert prayer times to 24-hour format for comparison
  const times = [
    { name: 'fajr', time: convertTo24Hour(prayerTimes.fajrAthan) },
    { name: 'dhur', time: convertTo24Hour(prayerTimes.dhurAthan) },
    { name: 'asr', time: convertTo24Hour(prayerTimes.asrAthan) },
    { name: 'maghrib', time: convertTo24Hour(prayerTimes.maghribAthan) },
    { name: 'isha', time: convertTo24Hour(prayerTimes.ishaAthan) },
  ];

  // Sort times to ensure they are in the correct order
  times.sort((a, b) => a.time.localeCompare(b.time));

  // Find the next prayer
  let nextPrayerName = '';
  for (let i = 0; i < times.length; i++) {
    if (currentTimeStr < times[i].time) {
      nextPrayerName = times[i].name;
      break;
    }
  }

  // If after Isha and before Fajr, set Fajr as the next prayer
  if (!nextPrayerName && currentTimeStr > times[times.length - 1].time) {
    nextPrayerName = times[0].name; // Assuming Fajr is the first prayer
  }

  // Update the class for the next prayer
  if (nextPrayerName) {
    newClasses[nextPrayerName] = 'upcomingPrayer';
  }

  setPrayerClasses(newClasses);
}, [prayerTimes]);

// Function to convert 12-hour time to 24-hour format for comparison
function convertTo24Hour(timeStr) {
  let [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (hours === 12) {
    hours = 0; // Adjust 12 AM to 0 hours and 12 PM to 12 hours
  }
  if (modifier === 'PM') {
    hours += 12; // Convert PM times to 24-hour format
  }
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}


// Update the classes when the component mounts or prayerTimes change
useEffect(() => {
  if (prayerTimes.status === 'succeeded') {
    updatePrayerClasses();
  }
  // Set interval to continuously update the class every minute
  const interval = setInterval(updatePrayerClasses, 60000);
  return () => clearInterval(interval); // Cleanup the interval on component unmount
}, [prayerTimes, updatePrayerClasses]);

const [announcements, setAnnouncements] = useState([])
const getAnnouncements = async() =>{
  try{
      const response = await fetch('https://isog-prayer-times-server.vercel.app/api/announcements')
      const data = await response.json()
      setAnnouncements(data.annoucements)
  }catch(error){
      console.log(error)
  }
}

 useEffect(()=>{
    getDate()
    getAnnouncements()
 }, [])

 useEffect(() => {
   if (currentDate) {
     getHijriDate()
   }
 }, [currentDate, getHijriDate])


  return (
    <div>
    {greeting && (
      <div className={`seasonalBanner seasonalBanner--${greetingType}`}>
        {greeting}
      </div>
    )}

    <div className='mainContainer1'>

      <div className='prayerTimesContainer'>
        <div className='prayerTimesTable'>
          <div className='prayerHeader'> 
            <div className='prayerTitle'>Prayer</div>
            <div className='prayerTitle2'>Times</div>
          </div>

          <div className='divider1'></div>

          <table className='prayerTableHomePage'>
          <thead>
              <tr>
              <th><strong>Salah</strong></th>
              <th><strong>Time</strong></th>
              <th><strong>Iqamah</strong></th>
              </tr>
              
          </thead>
          <tbody>
          <tr className={prayerClasses.fajr}>
                  <th><strong>Fajr</strong></th>
                  <th>{prayerTimes.fajrAthan}</th>
                  <th>{iqamahTimes.fajr} AM</th>
              </tr>
              <tr className={prayerClasses.dhur}>
                  <th><strong>Dhuhr</strong></th>
                  <th>{prayerTimes.dhurAthan}</th>
                  <th>{iqamahTimes.dhuhr} PM</th>
              </tr>
              <tr className={prayerClasses.asr}>
                  <th><strong>Asr</strong></th>
                  <th>{prayerTimes.asrAthan}</th>
                  <th>{iqamahTimes.asr} PM</th>
              </tr>
              <tr className={prayerClasses.maghrib}>
                  <th><strong>Maghrib</strong></th>
                  <th>{prayerTimes.maghribAthan}</th>
                  <th>{prayerTimes.maghribAthan}</th>
              </tr>
              <tr className={prayerClasses.isha}>
                  <th><strong>Isha</strong></th>
                  <th>{prayerTimes.ishaAthan}</th>
                  <th>{iqamahTimes.isha} PM</th>
              </tr>
          </tbody>
          </table>

          <div className='jummahInfoContainer'>
              
              <div className='jummahInfoHeader'>
                <img src={mosqueVector} alt=''/>
                <div>Jummah Prayer</div>
              </div>
              
              <div className='jummahInfo'>
                <div><strong>Start:</strong> 01:30 PM</div>
                <div><strong>Iqamah:</strong> 01:50 PM</div>
              </div>
        </div>
        </div>
      </div>
      
      <div className='eventsAndAnnoucementsContainer'>
        <div className='eventsContainer'>
          <div className='eventsTitle'>Announcements</div>
          <div className='divider1'></div>
          {announcements.length>0 ? announcements.map((announcements, index)=>(
            <div>{announcements}</div>
          )):
          <div>No Future Announcements Yet</div>
          }
          
        </div>

        <div className='quranClassContainer'>
          
          <div className='quranTitle'>Quran Class</div>
          <div className='divider1'></div>
          <div>All Ages</div>
          <div>Monday - Friday</div>
          <div>Between Maghrib and Isha</div>
        </div>
      </div>
 <div>
        <img src={masjid} alt='' className='masjidImage1'/>
      </div>

    </div>

    <section className='ramadanCalendarContainer'>
      <div className='ramadanCalendarHeader'>
        <div className='ramadanCalendarBadge'>Ramadan 1447 AH</div>
        <h2>2026 Ramadan Calendar</h2>
        <p>
          Daily fasting schedule for Guelph. Save this calendar for quick Suhoor
          and Iftar reference throughout the month.
        </p>
      </div>

      <div className='ramadanCalendarFrame'>
        <img src={ramadanCalendar} alt='2026 Ramadan fasting calendar for Guelph' />
      </div>
      <a
        className='ramadanCalendarDownloadBtn'
        href={RAMADAN_CALENDAR_DRIVE_URL}
        download='ramadanCalendar.pdf'
      >
        Download Ramadan Calendar
      </a>
    </section>


      <div className='ramadanContainer'>
        <div>FASTING TIMES IN GUELPH</div>
        <div>{currentHijriYear} Hijri {currentHijriDay} {currentHijriMonth}</div>
        <div>{moment().format('dddd MMMM D YYYY')}</div>

        {greeting && (
          <div className='counterContainer'>
            <div>{greeting}</div>
          </div>
        )}



        <div className='fastingContainer'>

          <div className='suhoorContainer'>
            <div>Suhoor</div>

            <div className='athanAndImage'>
              <img src={sunrise} alt='Sunrise'/>
              <div>{prayerTimes.fajrAthan}</div>
            </div>

          </div>

          
          <div className='iftarContainer'> 
            <div>Iftar</div>
            
            <div className='athanAndImage'>
              <img src={sunset} alt='Sunset'/>
              <div>{prayerTimes.maghribAthan}</div>
            </div>
            

          </div>
        
        </div>
      </div>

      <div className='footerContainer'>

        <div className='contactContainer'>
          <div>
            Contact Info
          </div>
          <div className='contactHome'>
                <img src={mail} alt='' />
                <a href='mailto:info.isofg@gmail.com'>info.isofg@gmail.com</a>
            </div>

            <div className='contactHome'>
                <img src={phone} alt=''/>
                <a href='tel:+15198039245'>+1 (519)803-9245</a>
            </div>
            <div className='contactHome'>
                <img src={phone} alt=''/>
                <a href='tel:+15193622582'>+1 (519)362-2582</a>
            </div>

            <div className='contactHome'>
              <img src={pin} />
              <a href="https://maps.google.com/?q=126+Norwich+St+E,+Guelph,+ON+N1E+2G7,+Canada" target="_blank" rel="noopener noreferrer">126 Norwich St E, Guelph, ON N1E 2G7, Canada</a>
            </div>
        </div>
     
      </div>
    </div>
  )
}

export default Home
