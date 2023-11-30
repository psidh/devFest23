'use client'
import React, { useState, useEffect } from 'react';
import { getDoc, collection, updateDoc, doc } from 'firebase/firestore';
import firestore from '../firebase';

// Define an interface for the attendee data
interface AttendeeData {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  role: string;
  flag: boolean;
}

export default function Home() {
  const [extractedEmail, setExtractedEmail] = useState<string | null>(null);
  
  useEffect(() => {
    extractEmail();
  }, []);

  const extractEmail = async (): Promise<string | null> => {
    try {
      let currentURL = window.location.href;
      let queryString = currentURL.split('?')[1];

      if (queryString) {
        let params = queryString.split('&');

        for (let i = 0; i < params.length; i++) {
          let param = params[i].split('=');

          if (param[0] === 'gmail') {
            let email = decodeURIComponent(param[1]);
            alert('Extracted Email: ' + email);
            setExtractedEmail(email);

            // Automatically update the flag when the email is extracted
            await updateFlag(email);

            return email;
          }
        }
      }

      alert('No email in the URL');
      setExtractedEmail(null);
      return null;
    } catch (error) {
      console.error('Error extracting and updating email:', error);
      return null;
    }
  };

  const handleConfirmClick = () => {
    // Check if extractedEmail exists before calling updateFlag
    if (extractedEmail) {
      updateFlag(extractedEmail);
      console.log('button clicked');
      
    }
    console.log('extracted email doesnt exist');
    
  };

  const updateFlag = async (email: string): Promise<void> => {
    try {
      const docRef = doc(firestore, 'attendees', email);

      // Update the 'flag' field to true
      await updateDoc(docRef, {
        flag: true,
      });

      alert('Flag updated successfully for email: ' + email);
    } catch (error) {
      console.error('Error updating flag in Firestore:', error);
    }
  };

  return (
    <section>
      <div className='flex justify-center items-center'>
      <img
        src="/devwhite.png"
        alt="DevFest"
        className="md:w-1/2 md:h-1/2 w-auto h-auto object-cover my-12"
      />
      </div>
      <div
        className="bg-gradient-to-b from-blue-950 to-blue-600 
      text-white font-sans flex flex-col justify-center items-center min-h-fit"
      >
        <div className="container mx-auto p-4 flex items-center justify-center flex-col">
          <p className="text-3xl font-bold my-16 text-center font-mono">
            Welcome to DevFest 2023!
          </p>
          <p className="text-2xl font-semibold my-6 text-center font-mono">
            Please RSVP using the form below.
          </p>
        </div>

        <div
          className="bg-white text-blue-600 my-16 p-4 rounded-full hover:bg-white/80 cursor-pointer transition duration-200"
          onClick={handleConfirmClick}
        >
          <h1 className="text-2xl font-bold px-4">Confirm your participation</h1>
        </div>
      </div>

      {extractedEmail && (
        <div className="text-center mt-4">
          <p className="text-lg">Extracted Email: {extractedEmail}</p>
        </div>
      )}
    </section>
  );
}
