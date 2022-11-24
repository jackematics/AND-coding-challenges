import GpsToCartesianConverter from './gps-to-cartesian-converter';

describe('GpsToCartesianConverter', () => {
  it('should convert (0, 0) to (halfMapX, halfMapY)', () => {
    const gpsCoordinates = { lat: 0, long: 0 };
    const exampleMapDimensions = { width: 456, height: 567 };

    expect(
      GpsToCartesianConverter.convertCoordinatesToCartesian(
        gpsCoordinates,
        exampleMapDimensions
      )
    ).toStrictEqual({
      x: exampleMapDimensions.width / 2,
      y: exampleMapDimensions.height / 2,
    });
  });

  it('should convert (90, -180) to (0, 0)', () => {
    const gpsCoordinates = { lat: 90, long: -180 };
    const exampleMapDimensions = { width: 456, height: 567 };

    expect(
      GpsToCartesianConverter.convertCoordinatesToCartesian(
        gpsCoordinates,
        exampleMapDimensions
      )
    ).toStrictEqual({
      x: 0,
      y: 0,
    });
  });

  it('should convert (-90, 180) to (widthMax, heightMax)', () => {
    const gpsCoordinates = { lat: -90, long: 180 };
    const exampleMapDimensions = { width: 456, height: 567 };

    expect(
      GpsToCartesianConverter.convertCoordinatesToCartesian(
        gpsCoordinates,
        exampleMapDimensions
      )
    ).toStrictEqual({
      x: exampleMapDimensions.width,
      y: exampleMapDimensions.height,
    });
  });
});
