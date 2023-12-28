import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    setFajrAthan,
    setShuruq,
    setDhurAthan,
    setAsrAthan,
    setMaghribAthan,
    setIshaAthan,
    fetchAthanTimes,
  } from '../../store/slices/prayerTimesSlice';
import { fetchPrayerTimes } from '../../store/slices/iqamahTimesSlice';
import mail from '../../images/mail.svg'
import phone from '../../images/phone.svg'
import chevronDown from '../../images/chevronDown.svg'
import sun from '../../images/sun.svg'
import sunrise from '../../images/sunrise.svg'
import sunset from '../../images/sunset.svg'
import moon from '../../images/moon.svg'
import masjidNight from '../../images/masjidNight.png'
import isog from '../../images/isog2.png'
import './NavBar.css'

const NavBar = () => {
    const [prayerTimingsModal, setPrayerTimingsModal] = useState(false)

    const dispatch = useDispatch();
    const { fajrAthan, shuruq, dhurAthan, asrAthan, maghribAthan, ishaAthan } = useSelector((state) => state.prayerTimes);
    const iqamahTimes = useSelector((state) => state.iqamahTimes);
    const prayerTimes = useSelector((state) => state.prayerTimes);


    const handlePrayerTimingsModal = async() =>{
        setPrayerTimingsModal(!prayerTimingsModal)
    }

    useEffect(() => {
        dispatch(fetchPrayerTimes());
        dispatch(fetchAthanTimes())
      }, [dispatch]);
    
  return (
    <>
    <div>
        <div className='navBar'>
          
            <div className='contactNavBar'>
                <img src={mail} alt='' />
                <a href='mailto:info@isofg.ca'>info@isofg.ca</a>
            </div>

            <div className='contactNavBar'>
                <img src={phone} alt=''/>
                <a href='tel:+15198039245'>+1 (519)803-9245</a>
            </div>

<div>
            <button onClick={handlePrayerTimingsModal} className='prayerBtn'>Prayer Timings <img src={chevronDown} alt='' /></button>
            {prayerTimingsModal &&(
    <div className='prayerModal'>
        <table>
        <thead>
            <tr>
              <th></th>
            <th><strong>Salah</strong></th>
            <th><strong>Time</strong></th>
            <th><strong>Iqama</strong></th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th><img src={sunrise} alt=""/></th>
                <th><strong>Fajr</strong></th>
                <th>{prayerTimes.fajrAthan}</th>
                <th>{iqamahTimes.fajr} AM</th>
            </tr>
            <tr>
            <th><img src={sun} alt=""/></th>
                <th><strong>Dhuhr</strong></th>
                <th>{prayerTimes.dhurAthan}</th>
                <th>{iqamahTimes.dhuhr} PM</th>
            </tr>
            <tr>
            <th><img src={sun} alt=""/></th>
                <th><strong>Asr</strong></th>
                <th>{prayerTimes.asrAthan}</th>
                <th>{iqamahTimes.asr} PM</th>
            </tr>
            <tr>
            <th><img src={sunset} alt=""/></th>
                <th><strong>Maghrib</strong></th>
                <th>{prayerTimes.maghribAthan}</th>
                <th>{prayerTimes.maghribAthan}</th>
            </tr>
            <tr>
            <th><img src={moon} alt=""/></th>
                <th><strong>Isha</strong></th>
                <th>{prayerTimes.ishaAthan}</th>
                <th>{iqamahTimes.isha} PM</th>
            </tr>
        </tbody>
        </table>
    </div>
    )}
</div>
        </div>

        <div className='navBarHeader'> 
        <div className='mosqueLogo'>
            <img src={isog} alt=''/>
            <div className='mosqueName'>مسجد أبو بكر الصديق - Masjid Abu Bakr As-Siddique
</div>
</div>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Events</li>
            </ul>
        </div>
    </div>
    
    
    </>
  )
}

export default NavBar