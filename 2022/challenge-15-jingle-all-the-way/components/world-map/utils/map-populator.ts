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

  public drawDestination(city: string, coords: MapCoordinates) {
    this.drawCityMarker(coords);
    this.drawCityMarkerText(city, coords);
  }

  private drawCityMarker(coords: MapCoordinates) {
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

  private drawCityMarkerText(city: string, coords: MapCoordinates) {
    const markerDistanceDelta = 4;

    this.context.font = '11px Comic Sans MS';
    this.context.fillStyle = 'red';
    this.context.fillText(
      city,
      coords.x + markerDistanceDelta,
      coords.y - markerDistanceDelta
    );
  }
}
