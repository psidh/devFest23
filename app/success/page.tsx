'use client';
import React, { useState, useRef, useEffect } from 'react';
import localFont from 'next/font/local';
const myFont = localFont({ src: '../GoogleSans-Regular-v1.27.ttf' });

export default function Page() {
  const [width, setWidth] = useState(-1);
  const [height, setHeight] = useState(-1);
  const [x, setX] = useState(-1);
  const [y, setY] = useState(-1);

  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      setWidth(imageRef.current.clientHeight * 0.6363636364);
      setHeight(imageRef.current.clientHeight);
      setX((imageRef.current.offsetWidth - width) / 2);
      setY((imageRef.current.offsetHeight - height) / 2);
      console.log(
        `Image width: ${width}, height: ${height}, Left: ${imageRef.current.offsetLeft}`
      );
    }
  }, []);

  let firstname = 'Sree Teja';
  let lastname = 'Dusi';

  if (firstname.length >= 12) {
    const namesThird = firstname.split(' ');
    if (namesThird.length >= 3) {
      firstname = namesThird[0] + ' ' + namesThird[1];
      lastname = namesThird[2];
    } else {
      firstname = namesThird[0];
      lastname = namesThird[1];
    }
  }

  const role = 'GITAM, Visakhapatnam';
  return (
    <div className={myFont.className}>
      <div className="relative flex justify-center items-center h-screen flex-col text-white">
        <img
          ref={imageRef}
          src="/id.svg"
          alt="ID card"
          style={{
            height: `100vh`,
          }}
        />

        <div
          className="absolute bottom-[22%] h-[26%] flex flex-col justify-end pb-12 pl-12 items-start   transform text-center"
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
}

// w-[${width}] h-[${height}]
