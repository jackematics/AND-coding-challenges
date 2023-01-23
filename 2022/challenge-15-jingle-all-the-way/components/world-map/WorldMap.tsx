import React, { useEffect, useRef } from 'react';
import { CityCartesianData, CityGpsData } from '../../types/city-data';
import CartesianOperations from './utils/cartesian-operations';
import GpsToCartesianConverter from './utils/gps-to-cartesian-converter';
import MapOperations from './utils/map-operations';
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

  const convertCityGpsToCartesian = (
    cityData: CityGpsData
  ): CityCartesianData => {
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

        const cartesianDestinationsData = destinationsData.map(
          convertCityGpsToCartesian
        );
        console.log(cartesianDestinationsData);

        let prevCoords: MapCoordinates;

        cartesianDestinationsData.map(
          (cityCartesianData: CityCartesianData) => {
            if (prevCoords) {
              const closestPoint = MapOperations.calculateClosestPoint(
                prevCoords,
                cityCartesianData.coords,
                mapSideDimensions.current
              );

              const drawingPoints = MapOperations.calculateDrawingPoints(
                prevCoords,
                closestPoint,
                mapSideDimensions.current
              );

              drawingPoints.map((point) => {
                populator.drawLineBetweenDestinations(point.to, point.from);
              });
            }

            prevCoords = cityCartesianData.coords;
          }
        );
        cartesianDestinationsData.map((cityCartesianData: CityCartesianData) =>
          populator.drawCityMarker(cityCartesianData.coords)
        );
        cartesianDestinationsData.map((cityCartesianData: CityCartesianData) =>
          populator.drawCityMarkerText(cityCartesianData)
        );
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
