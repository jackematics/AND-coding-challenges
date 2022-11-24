export default class GpsToCartesianConverter {
  private static readonly latMaxValue = 180;
  private static readonly longMaxValue = 360;

  public static convertCoordinatesToCartesian(
    gpsCoordinates: GpsCoordinates,
    mapSideDimensions: MapSideDimensions
  ): MapCoordinates {
    const longToX = this.convertLongToCartesian(
      gpsCoordinates.long,
      mapSideDimensions.width
    );
    const latToY = this.convertLatToCartesian(
      gpsCoordinates.lat,
      mapSideDimensions.height
    );

    return { x: longToX, y: latToY };
  }

  private static convertLatToCartesian(
    lat: number,
    sideDimension: number
  ): number {
    const midLat = this.latMaxValue / 2;

    const flattenedGpsValue =
      lat < 0 ? midLat + Math.abs(lat) : midLat - Math.abs(lat);

    return sideDimension * (flattenedGpsValue / this.latMaxValue);
  }

  private static convertLongToCartesian(
    long: number,
    sideDimension: number
  ): number {
    const midLong = this.longMaxValue / 2;

    const flattenedGpsValue =
      long < 0 ? midLong - Math.abs(long) : midLong + Math.abs(long);

    return sideDimension * (flattenedGpsValue / this.longMaxValue);
  }
}
