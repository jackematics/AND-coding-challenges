export default class MapPopulator {
  private readonly context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  public drawCityMarker(coords: MapCoordinates) {
    const markerSize = 5;
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
}
