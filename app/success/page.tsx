'use client';
import React, { useState, useRef, useEffect, FC, ChangeEvent } from 'react';
import QrCode from '@/components/Qr';
import { useSearchParams } from 'next/navigation';
import data from '../../data/data';

interface PageProps {}

const Page: FC<PageProps> = () => {
  const [width, setWidth] = useState<number>(-1);
  const [height, setHeight] = useState<number>(-1);
  const [x, setX] = useState<number>(-1);
  const [y, setY] = useState<number>(-1);

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      const newWidth = imageRef.current.clientHeight * 0.6363636364;
      setWidth(newWidth);
      setHeight(imageRef.current.clientHeight);
      setX((imageRef.current.offsetWidth - newWidth) / 2);
      setY((imageRef.current.offsetHeight - imageRef.current.clientHeight) / 2);
      console.log(
        `Image width: ${newWidth}, height: ${imageRef.current.clientHeight}, Left: ${imageRef.current.offsetLeft}`
      );
    }
  }, []);

  const search = useSearchParams();

  const extractedEmail = search.get('name');

  const entry = data.filter(
    (e) => e.firstName + e.lastName === extractedEmail
  )[0];
  console.log(entry);

  let firstName: string = entry.firstName;
  let lastName: string = entry.lastName;
  const role: string = entry.role;
  const email: string = entry.email;

  if (firstName.length >= 12) {
    const namesThird: string[] = firstName.split(' ');
    if (namesThird.length >= 3) {
      firstName = namesThird[0] + ' ' + namesThird[1];
      lastName = namesThird[2];
    } else {
      firstName = namesThird[0];
      lastName = namesThird[1];
    }
  }

  // async function addEntries (e1 : Object) {
  //   try {
  //     const docRef = db.collection('attendees').doc();
  //     await docRef.set(e1);

  //     alert.('Entry added successfully!');
  //   } catch (error) {
  //     console.error('Error adding entry:', error);
  //   }
  // }

  // useEffect(() => {
  //   addEntries(entry);
  // }, []); // Run this effect only once on component mount

  return (
    <div>
      <div className="relative flex justify-center items-center flex-col text-white">
        <img
          ref={imageRef}
          src="/id.svg"
          alt="ID card"
          style={{
            height: '100vh',
          }}
        />

        <div
          className="absolute bottom-[22%] h-[10%] md:bottom-[22%]  md:h-[10%] flex flex-col 
          justify-end pb-[23%] pl-[20%] md:pb-[3.7%] md:left-[20%] items-start  transform text-center"
          style={{
            width: width * 0.8,
          }}
        >
          <p className="text-3xl font-extrabold text-gray-900 text-left">
            {firstName}
          </p>
          <p className="text-3xl font-bold text-gray-900 mb-4 text-left">
            {lastName}
          </p>
          <p className="text-md text-gray-600 ">{role}</p>
        </div>

        <div
          className="absolute bottom-[22%] h-[10%] md:bottom-[22%]   flex flex-col 
          justify-end  pb-[23%] pl-[60%] md:pb-[3.5%] md:pl-[18%] items-start   transform text-center"
          style={{
            width: width * 0.8,
          }}
        >
          <QrCode email={email} size={110} />
        </div>
      </div>
    </div>
  );
};

export default Page;
