'use client';
import React, { useState, useRef, useEffect, FC } from 'react';
import localFont from 'next/font/local';

interface PageProps {}

const myFont = localFont({ src: '../GoogleSans-Regular-v1.27.ttf' });

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

  let firstname: string = 'Sree Teja';
  let lastname: string = 'Dusi';

  if (firstname.length >= 12) {
    const namesThird: string[] = firstname.split(' ');
    if (namesThird.length >= 3) {
      firstname = namesThird[0] + ' ' + namesThird[1];
      lastname = namesThird[2];
    } else {
      firstname = namesThird[0];
      lastname = namesThird[1];
    }
  }

  const role: string = 'GITAM, Visakhapatnam';

  return (
    <div className={myFont.className}>
      <div className="relative flex justify-center items-center h-screen flex-col text-white">
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
          justify-end pb-20 pl-20 md:pb-12 md:left-[35%] items-start   transform text-center"
          style={{
            width: width * 0.8,
          }}
        >
          <p className="text-3xl font-extrabold text-gray-900 ">{firstname}</p>
          <p className="text-3xl font-bold text-gray-900 mb-4">{lastname}</p>
          <p className="text-md text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
