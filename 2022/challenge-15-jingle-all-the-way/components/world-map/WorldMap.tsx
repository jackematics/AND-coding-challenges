import React, { useEffect, useRef } from 'react';
import { CityCartesianData, CityGpsData } from '../../types/city-data';
import GpsToCartesianConverter from './utils/gps-to-cartesian-converter';
import MapPopulator from './utils/map-populator';

type WorldMapProps = {
  destinationsData: CityGpsData[];
};

const WorldMap = ({ destinationsData }: WorldMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapSideDimensions = useRef<MapSideDimensions>({
    width: 1408,
    height: 708,
  });

  const convertGpsToCartesian = (cityData: CityGpsData): CityCartesianData => {
    const gpsCoords: GpsCoordinates = {
      lat: parseFloat(cityData.lat),
      long: parseFloat(cityData.long),
    };
    const mapCoords = GpsToCartesianConverter.convertCoordinatesToCartesian(
      gpsCoords,
      mapSideDimensions.current
    );

    return { city: cityData.city, coords: mapCoords };
  };

  useEffect(() => {
    if (canvasRef.current) {
      const context: CanvasRenderingContext2D | null =
        canvasRef.current.getContext('2d');

      if (context) {
        const populator = new MapPopulator(context);
        populator.depopulateMap(mapSideDimensions.current);

        let previousCoords: MapCoordinates;

        const cartesianDestinationsData = destinationsData.map(
          convertGpsToCartesian
        );
        cartesianDestinationsData.map(
          (cityCartesianData: CityCartesianData) => {
            populator.drawLineBetweenDestinations(
              previousCoords,
              cityCartesianData.coords
            );
            previousCoords = cityCartesianData.coords;
          }
        );
        cartesianDestinationsData.map((cityCartesianData: CityCartesianData) =>
          populator.drawCityMarker(cityCartesianData.coords)
        );
        cartesianDestinationsData.map((cityCartesianData: CityCartesianData) =>
          populator.drawCityMarkerText(cityCartesianData)
        );
        // populator.drawDestination(cityData.city, mapCoords, previousCoords);
        // previousCoords = mapCoords;
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
