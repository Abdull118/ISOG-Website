import {useState, useEffect, useRef, useCallback} from 'react'
import mail from '../../images/mail.svg'
import phone from '../../images/phone.svg'
import isog from '../../images/isog2.png'
import './NavBar.css'
import { useWindowWidth } from '../functions/useWindowWidth'
import dropDown from '../../images/mobileMenuDrop.svg'
import { copyURL } from '../functions/copyURL'

const NavBar = () => {

    const windowWidth = useWindowWidth();
    const [currentHijriDay, setCurrentHijriDay] = useState()
    const [currentHijriMonth, setCurrentHijriMonth] = useState()
    const [currentHijriYear, setCurrentHijriYear] = useState()
    const [currentDate, setCurrentDate] = useState()
    const [confirmScreen, setConfirmScreen] = useState(false)

    const [isOpen, setIsOpen] = useState(false);
    const handleMenu = () => {
        setIsOpen(!isOpen);
    };

    const getDate = () => {
        var today = new Date(),
        date = (today.getDate())  + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        setCurrentDate(date)
      };

      
    const getHijriDate = async () => {
        try {
         const response = await fetch(`https://api.aladhan.com/v1/gToH?date=${currentDate}`);
         const json = await response.json();
         setCurrentHijriDay(json.data.hijri.day)
         setCurrentHijriMonth(json.data.hijri.month.ar)
         setCurrentHijriYear(json.data.hijri.year)
         console.log(json)
       } catch (error) {
         console.log(error)
       }
     }

     const handleCopyFunction = () => {
        setConfirmScreen(!confirmScreen)
        copyURL('Donations.isofg@gmail.com')

        if(isOpen === true){
            setIsOpen(false)
        }
     } 



    useEffect(()=>{
        getDate()
     }, [])

    useEffect(() => {
        if (currentDate) {
            getHijriDate()
        }
    }, [currentDate])

     const modalRef = useRef();

     const handleClickOutside = (event) => {
        if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
            setIsOpen(false); 
        }
    };


     useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

  return (
    <>
    {windowWidth < 800
        ?
            isOpen
                ?
                <div className='mobileNav'>
                    <div className='calendarAndCountDownContainer'>
                        <div>{currentHijriYear} Hijri {currentHijriDay} {currentHijriMonth}</div>
                    
                    </div>

                    <div className='logoAndNav'>
                    <img src={isog} alt='' className='mobileMosqueLogo'/>
                    <a className='donateBtn' onClick={handleCopyFunction}>Donate via eTransfer</a>
                    <img src={dropDown} onClick={handleMenu} alt='' />
                   </div>

                   <div className='header'>
        
                
                        <div className='mosqueName'>Masjid Abu Bakr As-Siddique</div>
                
                        </div>
                
                </div>
                :
                <div className='mobileNav'>
                    <div className='calendarAndCountDownContainer'>
                        <div>{currentHijriYear} Hijri {currentHijriDay} {currentHijriMonth}</div>
                    
                    </div>

                    <div className='logoAndNav'>
                    <img src={isog} alt='' className='mobileMosqueLogo'/>
                    <a className='donateBtn' onClick={handleCopyFunction}>Donate via eTransfer</a>

                    <img src={dropDown} onClick={handleMenu} alt='' />
                   </div>

                   <div className='header'>
        
                
                        <div className='mosqueName'>Masjid Abu Bakr As-Siddique</div>
                
                        </div>
                
                </div>
        :
            null
    }
    
    {windowWidth < 800
        ?
            isOpen
                
            ?
            <div className='mobileNavOpen' ref={modalRef}>
                <div className='closeOutModal' onClick={handleMenu}>X</div>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/funeral-services">Funeral Services</a></li>
                <li><a href='https://chat.whatsapp.com/KyThZmCSyLcFmmhovbx9bk' target='_blank'>WhatsApp Group</a></li>
                
                {/* Link for Ramadan Calendar Download from Google Drive: */}

                {/* <li><a href="https://drive.google.com/uc?export=download&id=1w7NR5r94XUyyUaRK56VXAznPxWV9HjJI" download="ramadanCalendar.pdf">
                        Ramadan Calendar</a></li> */}
                <li className='donateBtn'><a onClick={handleCopyFunction}>Donate via eTransfer</a></li>
            </ul>
            </div>
                :
                null
                :
            <div>
                <div className='header'>
        
            <div className='calendarAndCountDownContainer'>
                <div>{currentHijriYear} Hijri {currentHijriDay} {currentHijriMonth}</div>
        
        
            </div>
                <div className='mosqueName'>Masjid Abu Bakr As-Siddique</div>
        
                    <div className='contactNavBar'>
                        <img src={mail} alt='' />
                        <a href='mailtoinfo.isofg@gmail.com'>info.isofg@gmail.com</a>
                    </div>
        
                    <div className='contactNavBar'>
                        <img src={phone} alt=''/>
                        <a href='tel:+15198039245'>+1 (519)803-9245</a>
                    </div>
        
                </div>
        
        
                <div className='navBarHeader'> 
               
                <div className='mosqueLogo'>
                    <img src={isog} alt=''/>
                   
                </div>
                                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/funeral-services">Funeral Services</a></li>
                        <li><a href='https://chat.whatsapp.com/KyThZmCSyLcFmmhovbx9bk' target='_blank'>WhatsApp Group</a></li>
                        
                        {/* Link for Ramadan Calendar Download from Google Drive: */}

                        {/* <li><a href="https://drive.google.com/uc?export=download&id=16-_Mwyy9K3pbewk4UzoIsqCTCfV4kydd" download="ramadanCalendar.pdf">
                        Ramadan Calendar</a></li>
                        <li className='donateBtn'><a onClick={handleCopyFunction}>Donate via eTransfer</a></li> */}
                    </ul>
        
                </div>
            </div>
    }

    {confirmScreen && (
        <div className='confirmScreenOverlay'>
            <div className='confirmScreenContainer'>
                <div className='confirmScreenTitle'>
                    Jazak Allahu Khayrun for Supporting Your Masjid !!
                </div>

                <div className='confirmScreenMessage'> 
                    Click the button below to copy the email for eTransfer.
                </div>

                <button className='copyButton' onClick={handleCopyFunction}>Copy Email & Close</button>
            </div>

        </div>
    )}

    
    
    </>
  )
}

export default NavBar