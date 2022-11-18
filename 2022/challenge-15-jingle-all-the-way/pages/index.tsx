import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import Itinerary from '../components/Itinerary';
import WorldMap from '../components/WorldMap';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center">
        <h1 className="font-mono text-5xl font-bold leading-relaxed">
          Jingle All the Way
        </h1>
      </div>
      <div className="flex">
        <Itinerary />
        <WorldMap />
      </div>
    </div>
  );
}
