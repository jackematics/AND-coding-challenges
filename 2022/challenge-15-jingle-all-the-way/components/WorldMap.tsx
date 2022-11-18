import React from 'react';
import Image from 'next/image';

const WorldMap = () => {
  return (
    <>
      <div>
        <Image
          className="absolute"
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
