import React from 'react';
import './AboutUs.css';
import mail from '../images/mail.svg';
import phone from '../images/phone.svg';
import pin from '../images/pin.svg';
import masjid from '../images/masjidNight.jpeg';
import mosqueVector from '../images/mosque.svg';

const AboutUs = () => {
  return (
    <div>
      <div className='mainContainer'>
        <div className='aboutContainer'>
          <div className='aboutContent'>
            <div className='aboutHeader'>
              <img src={mosqueVector} alt='Mosque Icon'/>
              <div className='aboutTitle'>About Us</div>
            </div>
            
            <div className='divider1'></div>
            
            <div className='aboutText'>
              <h2>Masjid Abu Bakr As-Siddique</h2>
              <p>
                Welcome to Masjid Abu Bakr As-Siddique, a vibrant Islamic center serving the Muslim community in Guelph, Ontario. 
                Our masjid is dedicated to fostering spiritual growth, community unity, and Islamic education for all.
              </p>
              
              <h3>Our Mission</h3>
              <p>
                To provide a welcoming environment for Muslims to practice their faith, strengthen community bonds, 
                and promote understanding between different cultures and faiths in the greater Guelph area.
              </p>
              
              <h3>Our Services</h3>
              <ul>
                <li>Daily prayers (5 times a day)</li>
                <li>Jummah prayers every Friday</li>
                <li>Islamic education and Quran classes</li>
                <li>Community events and celebrations</li>
                <li>Funeral services</li>
                <li>Marriage ceremonies</li>
                <li>Islamic counseling and guidance</li>
              </ul>
              
              <h3>Community Programs</h3>
              <p>
                We offer various programs for all age groups including Quran classes, Islamic studies, 
                youth activities, and family events. Our masjid serves as a hub for community engagement 
                and spiritual development.
              </p>
              
              <h3>Get Involved</h3>
              <p>
                We welcome all members of the community to participate in our activities and services. 
                Whether you're looking to learn more about Islam, connect with fellow Muslims, or simply 
                find a place of peace and reflection, you're welcome here.
              </p>
            </div>
          </div>
        </div>
        
        <div className='imageContainer'>
          <img src={masjid} alt='Masjid Abu Bakr As-Siddique' className='masjidImage'/>
        </div>
      </div>

      <div className='footerContainer'>
        <div className='contactContainer'>
          <div>
            Contact Info
          </div>
          <div className='contactHome'>
            <img src={mail} alt='Email' />
            <a href='mailto:info.isofg@gmail.com'>info.isofg@gmail.com</a>
          </div>

          <div className='contactHome'>
            <img src={phone} alt='Phone'/>
            <a href='tel:+15198039245'>+1 (519)803-9245</a>
          </div>
          <div className='contactHome'>
            <img src={phone} alt='Phone'/>
            <a href='tel:+15193622582'>+1 (519)362-2582</a>
          </div>

          <div className='contactHome'>
            <img src={pin} alt='Location' />
            <a href="https://maps.google.com/?q=126+Norwich+St+E,+Guelph,+ON+N1E+2G7,+Canada" target="_blank" rel="noopener noreferrer">126 Norwich St E, Guelph, ON N1E 2G7, Canada</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
