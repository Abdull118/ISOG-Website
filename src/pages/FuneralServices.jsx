import React from 'react';
import './FuneralServices.css';
import mail from '../images/mail.svg';
import phone from '../images/phone.svg';
import pin from '../images/pin.svg';
import masjid from '../images/masjidNight.jpeg';
import mosqueVector from '../images/mosque.svg';

const FuneralServices = () => {
  return (
    <div>
      <div className='mainContainer'>
        <div className='funeralContainer'>
          <div className='funeralContent'>
            <div className='funeralHeader'>
              <img src={mosqueVector} alt='Mosque Icon'/>
              <div className='funeralTitle'>Funeral Services</div>
            </div>
            
            <div className='divider1'></div>
            
            <div className='funeralText'>
              <h2>Islamic Funeral Services</h2>
              <p>
                Masjid Abu Bakr As-Siddique provides comprehensive Islamic funeral services 
                to support families during their time of loss. We follow Islamic traditions 
                and customs to ensure a dignified and respectful farewell for your loved ones.
              </p>
              
              <h3>Our Funeral Services Include:</h3>
              <ul>
                <li><strong>Ghusl (Ritual Washing):</strong> Proper Islamic ritual washing of the deceased</li>
                <li><strong>Kafan (Shrouding):</strong> Traditional Islamic shrouding with white cloth</li>
                <li><strong>Janazah Prayer:</strong> Funeral prayer service at the masjid</li>
                <li><strong>Burial Arrangements:</strong> Coordination with local cemeteries</li>
                <li><strong>Religious Guidance:</strong> Support and counseling for families</li>
                <li><strong>Community Support:</strong> Assistance with funeral logistics</li>
              </ul>
              
              <h3>Emergency Contact</h3>
              <p>
                For immediate assistance with funeral arrangements, please contact us immediately. 
                We are available 24/7 to help families in their time of need.
              </p>
              
              <div className='emergencyContact'>
                <div className='contactItem'>
                  <img src={phone} alt='Phone'/>
                  <a href='tel:+15198039245'>+1 (519) 803-9245</a>
                </div>
                <div className='contactItem'>
                  <img src={mail} alt='Email'/>
                  <a href='mailto:info.isofg@gmail.com'>info.isofg@gmail.com</a>
                </div>
              </div>
              
              <h3>Important Information</h3>
              <div className='infoSection'>
                <h4>What to Do When a Muslim Passes Away:</h4>
                <ol>
                  <li>Contact the masjid immediately</li>
                  <li>Do not delay the funeral process</li>
                  <li>Prepare necessary documentation</li>
                  <li>Coordinate with family members</li>
                  <li>Arrange for transportation if needed</li>
                </ol>
              </div>
              
              <h3>Funeral Prayer Times</h3>
              <p>
                Janazah prayers are typically held at the masjid. The timing will be coordinated 
                with the family and community members. We ensure that all Islamic requirements 
                are met according to Shariah guidelines.
              </p>
              
              <h3>Community Support</h3>
              <p>
                Our community comes together to support families during funeral services. 
                We provide assistance with meals, transportation, and other logistical needs 
                to help ease the burden during this difficult time.
              </p>
              
              <div className='noteBox'>
                <h4>Note:</h4>
                <p>
                  Islamic funerals should be conducted as soon as possible after death, 
                  typically within 24 hours. Please contact us immediately for guidance 
                  and assistance with all funeral arrangements.
                </p>
              </div>
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
            <img src={pin} alt='Location' />
            <a href="https://maps.google.com/?q=126+Norwich+St+E,+Guelph,+ON+N1E+2G7,+Canada" target="_blank" rel="noopener noreferrer">126 Norwich St E, Guelph, ON N1E 2G7, Canada</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuneralServices;
