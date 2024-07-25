import React, { useEffect, useState } from 'react'
import { copyURL } from '../components/functions/copyURL';
import '../components/NavBar/NavBar.css'
const ETransfer = () => { 
    const [confirmScreen, setConfirmScreen] = useState(false)

    const [isOpen, setIsOpen] = useState(false);

    const handleCopyFunction = () => {
        setConfirmScreen(!confirmScreen)
        copyURL('Donations.isofg@gmail.com')
     } 

     useEffect(()=>{
        copyURL('Donations.isofg@gmail.com')
     })

  return (
    <div className='confirmScreenOverlay'>
            <div className='confirmScreenContainer'>
                <div className='confirmScreenTitle'>
                    Jazak Allahu Khayrun for Supporting Your Masjid !!
                </div>

                <div className='confirmScreenMessage'> 
                    Click the button below to copy the email for eTransfer.
                </div>

                <button className='copyButton' onClick={handleCopyFunction}>Copy Email</button>
            </div>

        </div>
  )
}

export default ETransfer