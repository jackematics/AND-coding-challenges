import React from 'react';
import Image from 'next/image';

const WorldMap = () => {
  return (
    <>
      <div className="flex justify-center">
        <h1 className="font-mono text-5xl font-bold leading-relaxed">
          Jingle All the Way
        </h1>
      </div>
      <div className="flex justify-center">
        <Image
          src={'/printable-world-map-hd.jpg'}
          alt={'world-map'}
          width="1288"
          height="870"
        />
      </div>
    </>
  );
};

export default WorldMap;
