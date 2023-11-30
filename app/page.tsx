'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/firebase.js';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [extractedEmail, setExtractedEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const search = useSearchParams();
  const router = useRouter();

  const extractEmail = async () => {
    try {
      const extractedEmail = search.get('email');
      setExtractedEmail(extractedEmail);

      if (extractedEmail) {
        const doc = db.collection('attendees').doc(extractedEmail);
        setLoading(true);

        await doc.update({ flag: true });

        // Since the update method doesn't return a value, you can assume success if it doesn't throw an error
        router.push('/success');
      } else {
        alert('Email not found');
      }
    } catch (e) {
      alert(`Something went wrong, please try again. ${e}`);
    }
  };

  return (
    <section>
      <div className="flex justify-center items-center">
        <img
          src="/devwhite.png"
          alt="DevFest"
          className="md:w-1/2 md:h-1/2 w-auto h-auto object-cover my-12"
        />
      </div>
      {!loading ? (
        <div
          className="bg-yellow-500 
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
            className="bg-white text-yellow-600 my-16 p-4 rounded-full hover:bg-white/80 cursor-pointer transition duration-200"
            onClick={extractEmail}
          >
            <h1 className="text-2xl font-bold px-4">
              Confirm your participation
            </h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen text-white">
          Loading...
        </div>
      )}
    </section>
  );
}
