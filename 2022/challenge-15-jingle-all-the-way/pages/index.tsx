import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import React, { useState } from 'react';
import SantaItinerary, {
  DestinationData,
} from '../components/itinerary/SantaItinerary';
import WorldMap from '../components/world-map/WorldMap';
import styles from '../styles/Home.module.css';
import CityData from '../types/city-data';

const getCityData = async () => {
  return await (await fetch(`http://localhost:3000/api/city/`)).json();
};

export default function Home() {
  const { data, isLoading, isError, error } = useQuery<CityData[]>({
    queryKey: ['cities'],
    queryFn: getCityData,
  });
  const [destinationsData, setDestinationData] = useState<CityData[]>([]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError && error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  const handleItineraryCallback = (itinerary: DestinationData[]) => {
    const itineraryContainsCity = (city: string): boolean =>
      Boolean(
        itinerary.find(
          (destination: DestinationData) => destination.destination === city
        )
      );

    const destinationsLocationData = itinerary.map((destinationsData) =>
      data?.find((data) => data.city === destinationsData.destination)
    ) as unknown as CityData[];

    setDestinationData(destinationsLocationData);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Jingle All the Way</title>
        <meta name="description" content="Jingle all the way" />
      </Head>
      <div className="flex justify-center">
        <h1 className="font-mono text-5xl font-bold leading-relaxed">
          Jingle All the Way
        </h1>
      </div>
      <div className="flex">
        <SantaItinerary
          cityData={data ?? []}
          itineraryCallback={handleItineraryCallback}
        />
        <WorldMap destinationsData={destinationsData} />
      </div>
    </div>
  );
}
