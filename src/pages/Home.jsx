import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Home.css'
import { fetchPrayerTimes } from '../store/slices/iqamahTimesSlice';
import moment from 'moment/moment';
import sunrise from '../images/sunrise2.svg'
import sunset from '../images/sunset2.svg'
import mail from '../images/mail.svg'
import phone from '../images/phone.svg'
import pin from '../images/pin.svg'

const Home = () => {

  const dispatch = useDispatch();
  const { fajrAthan, shuruq, dhurAthan, asrAthan, maghribAthan, ishaAthan } = useSelector((state) => state.prayerTimes);
  const iqamahTimes = useSelector((state) => state.iqamahTimes);

  useEffect(() => {
    dispatch(fetchPrayerTimes());
  }, [dispatch]);

  const [currentHijriDay, setCurrentHijriDay] = useState()
  const [currentHijriMonth, setCurrentHijriMonth] = useState()
  const [currentHijriYear, setCurrentHijriYear] = useState()
  const [currentDate, setCurrentDate] = useState()
  const [ramadanCounter, setRamadanCounter] = useState()

  const getDate = () => {
    var today = new Date(),
    date = (today.getMonth() + 1)  + '-' + today.getDate() + '-' + today.getFullYear();
    setCurrentDate(date)
  };

  const getHijriDate = async () => {
    try {
     const response = await fetch(`https://api.aladhan.com/v1/gToH?=${currentDate}`);
     const json = await response.json();
     setCurrentHijriDay(json.data.hijri.day)
     setCurrentHijriMonth(json.data.hijri.month.ar)
     setCurrentHijriYear(json.data.hijri.year)
   } catch (error) {
     console.log(error)
   }
 }

 function countdownToSundown() {
  
  var sundownDate = new Date(2024, 2, 10, 18, 0, 0); 

  var x = setInterval(function() {

      var now = new Date().getTime();

      var timeRemaining = sundownDate - now;

      var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setRamadanCounter(days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ");

      if (timeRemaining < 0) {
          clearInterval(x);
          console.log("Sundown has occurred.");
      }
  }, 1000);
}



 useEffect(()=>{
    getDate()
    getHijriDate()
    countdownToSundown();
 })


  return (
    <div>
      <div className='bismillah'>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
      <div className='isogHeader'>Islamic Society of Guleph</div>

      <div className='row1Btns'>
        <button>News</button>
        <button>Events</button>
        <button>Friday Prayers</button>
      </div>

      <div className='row2Btns'>
        <button>WhatsApp Group</button>
        <button>Donate To Us</button>
      </div>

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
            <th><strong>Iqama</strong></th>
            </tr>
            
        </thead>
        <tbody>
            <tr>
                <th><strong>Fajr</strong></th>
                <th>{fajrAthan}</th>
                <th>{iqamahTimes.fajr} AM</th>
            </tr>
            <tr>
                <th><strong>Dhuhr</strong></th>
                <th>{dhurAthan}</th>
                <th>{iqamahTimes.dhuhr} PM</th>
            </tr>
            <tr>
                <th><strong>Asr</strong></th>
                <th>{asrAthan}</th>
                <th>{iqamahTimes.asr} PM</th>
            </tr>
            <tr>
                <th><strong>Maghrib</strong></th>
                <th>{maghribAthan}</th>
                <th>{maghribAthan}</th>
            </tr>
            <tr>
                <th><strong>Isha</strong></th>
                <th>{ishaAthan}</th>
                <th>{iqamahTimes.isha} PM</th>
            </tr>
        </tbody>
        </table>

        <div className='locationInfo'>

        <div>Location: Guelph, ON</div>
        <div className='hijri'>{currentHijriYear} Hijri {currentHijriDay} {currentHijriMonth}</div>
        <div className='georgian'>{moment().format('dddd MMMM D YYYY')}</div>

      </div>
      </div>
      </div>

      <div className='ramadanContainer'>
        <div>FASTING TIMES IN GUELPH</div>
        <div>{currentHijriYear} Hijri {currentHijriDay} {currentHijriMonth}</div>
        <div>{moment().format('dddd MMMM D YYYY')}</div>

    <div className='counterContainer'>
        <div>Time Left to Ramadan:</div>
        <div>-{ramadanCounter}</div>
    </div>

        <div className='fastingContainer'>

          <div className='suhoorContainer'>
            <div>Suhoor</div>

            <div className='athanAndImage'>
              <img src={sunrise} alt=''/>
              <div>{fajrAthan}</div>
            </div>

          </div>

          
          <div className='iftarContainer'> 
            <div>Iftar</div>
            
            <div className='athanAndImage'>
              <img src={sunset} alt=''/>
              <div>{maghribAthan}</div>
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
                <a href='mailto:info@isofg.ca'>info@isofg.ca</a>
            </div>

            <div className='contactHome'>
                <img src={phone} alt=''/>
                <a href='tel:+15198039245'>+1 (519)803-9245</a>
            </div>

            <div className='contactHome'>
              <img src={pin} />
              <div>126 Norwich St E, Guelph, ON N1E 2G7, Canada</div>
            </div>
        </div>
     
      </div>
    </div>
  )
}

export default Home