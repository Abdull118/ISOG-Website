import {useState, useEffect} from 'react'
import mail from '../../images/mail.svg'
import phone from '../../images/phone.svg'
import isog from '../../images/isog2.png'
import './NavBar.css'

const NavBar = () => {

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
      
            setRamadanCounter(days + " days " + hours + " hours " + minutes + " minutes ");
      
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
    <>
    <div>
        <div className='header'>

    <div className='calendarAndCountDownContainer'>
        <div>{currentHijriYear} Hijri {currentHijriDay} {currentHijriMonth}</div>

        <div> / Ramadan:</div>

        <div>-{ramadanCounter}</div>
    </div>
        <div className='mosqueName'>Masjid Abu Bakr As-Siddique</div>

            <div className='contactNavBar'>
                <img src={mail} alt='' />
                <a href='mailto:info@isofg.ca'>info@isofg.ca</a>
            </div>

            <div className='contactNavBar'>
                <img src={phone} alt=''/>
                <a href='tel:+15198039245'>+1 (226)505-7435</a>
            </div>

        </div>


        <div className='navBarHeader'> 
       
        <div className='mosqueLogo'>
            <img src={isog} alt=''/>
           
        </div>
        <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Funeral Services</li>
                <li><a href='https://chat.whatsapp.com/KyThZmCSyLcFmmhovbx9bk' target='_blank'>WhatsApp Group</a></li>
                <li className='donateBtn'>Donate to Us</li>
            </ul>

        </div>
    </div>
    
    
    </>
  )
}

export default NavBar