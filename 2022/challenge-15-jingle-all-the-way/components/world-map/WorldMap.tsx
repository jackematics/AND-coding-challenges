import React, { useEffect, useRef } from 'react';
import CityData from '../../types/city-data';
import GpsToCartesianConverter from './utils/gps-to-cartesian-converter';
import MapPopulator from './utils/map-populator';

type WorldMapProps = {
  destinationsData: CityData[];
};

const WorldMap = ({ destinationsData }: WorldMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapSideDimensions = useRef<MapSideDimensions>({
    width: 1280,
    height: 644,
  });

  useEffect(() => {
    if (canvasRef.current) {
      const context: CanvasRenderingContext2D | null =
        canvasRef.current.getContext('2d');

      if (context) {
        const populator = new MapPopulator(context);
        destinationsData.map((cityData: CityData) => {
          const coords: GpsCoordinates = {
            lat: parseFloat(cityData.lat),
            long: parseFloat(cityData.long),
          };

          populator.drawCityMarker(
            GpsToCartesianConverter.convertCoordinatesToCartesian(
              coords,
              mapSideDimensions.current
            )
          );
        });
      }
    }
  }, [destinationsData, mapSideDimensions]);

  return (
    <>
      <div>
        <canvas
          id="worldScribbler"
          ref={canvasRef}
          width={mapSideDimensions.current.width}
          height={mapSideDimensions.current.height}
          className="absolute z-10 bg-cover bg-[url('/assets/1280px-Equirectangular_projection_SW.jpg')]"
        ></canvas>
      </div>
    </>
  );
};

export default WorldMap;
