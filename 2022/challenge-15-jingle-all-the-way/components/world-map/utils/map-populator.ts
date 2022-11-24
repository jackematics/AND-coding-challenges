import { CityCartesianData } from '../../../types/city-data';

export default class MapPopulator {
  private readonly context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  public depopulateMap(mapSideDimensions: MapSideDimensions) {
    this.context.clearRect(
      0,
      0,
      mapSideDimensions.width,
      mapSideDimensions.height
    );
  }

  public drawLineBetweenDestinations(
    previousCoords: MapCoordinates,
    coords: MapCoordinates
  ) {
    if (previousCoords) {
      this.context.beginPath();
      this.context.lineWidth = 3;
      this.context.strokeStyle = '#EE4B2B';
      this.context.moveTo(previousCoords.x, previousCoords.y);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  public drawCityMarker(coords: MapCoordinates) {
    const markerSize = 4;
    const circlePolarCoords = { startAngle: 0, endAngle: 2 * Math.PI };

    this.context.beginPath();
    this.context.arc(
      coords.x,
      coords.y,
      markerSize,
      circlePolarCoords.startAngle,
      circlePolarCoords.endAngle
    );
    this.context.fillStyle = '#EE4B2B';
    this.context.fill();
  }

  public drawCityMarkerText(cityCartesianData: CityCartesianData) {
    const markerDistanceDelta = 4;

    this.context.font = '11px Comic Sans MS';
    this.context.fillStyle = 'black';
    this.context.fillText(
      cityCartesianData.city,
      cityCartesianData.coords.x + markerDistanceDelta,
      cityCartesianData.coords.y - markerDistanceDelta
    );
  }
}
