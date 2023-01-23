import CartesianOperations from './cartesian-operations';

type DrawingPoints = {
  from: MapCoordinates;
  to: MapCoordinates;
};

export default class MapOperations {
  public static calculateClosestPoint(
    from: MapCoordinates,
    to: MapCoordinates,
    dimMaxes: MapSideDimensions
  ): MapCoordinates {
    const possiblePointShifts: MapCoordinates[] = [
      { ...to },
      {
        x: to.x - dimMaxes.width,
        y: to.y - dimMaxes.height,
      },
      {
        x: to.x - dimMaxes.width,
        y: to.y,
      },
      {
        x: to.x - dimMaxes.width,
        y: to.y + dimMaxes.height,
      },
      {
        x: to.x,
        y: to.y - dimMaxes.height,
      },
      {
        x: to.x,
        y: to.y + dimMaxes.height,
      },
      {
        x: to.x + dimMaxes.width,
        y: to.y - dimMaxes.height,
      },
      {
        x: to.x + dimMaxes.width,
        y: to.y,
      },
      {
        x: to.x + dimMaxes.width,
        y: to.y + dimMaxes.height,
      },
    ];

    return possiblePointShifts.sort(
      (a, b) =>
        CartesianOperations.calculateLineLength(from, a) -
        CartesianOperations.calculateLineLength(from, b)
    )[0];
  }

  public static calculateDrawingPoints(
    from: MapCoordinates,
    to: MapCoordinates,
    dimMaxes: MapSideDimensions
  ): DrawingPoints[] {
    const drawingPoints: DrawingPoints[] = [];
    const xInterceptValue = CartesianOperations.calculateXIntercept(from, to);
    const yInterceptValue = CartesianOperations.calculateYIntercept(from, to);

    const xInterceptValid = this.interceptValid(from.x, to.x, dimMaxes.width);
    const yInterceptValid = this.interceptValid(from.y, to.y, dimMaxes.height);

    if (
      xInterceptValue &&
      xInterceptValid &&
      yInterceptValue &&
      yInterceptValid
    ) {
      const xIntercept: MapCoordinates = {
        x: xInterceptValue,
        y: 0,
      };
      const yIntercept: MapCoordinates = {
        x: 0,
        y: yInterceptValue,
      };
      const distanceToXIntercept = CartesianOperations.calculateLineLength(
        from,
        xIntercept
      );
      const distanceToYIntercept = CartesianOperations.calculateLineLength(
        from,
        yIntercept
      );

      const furthestIntercept =
        Math.max(distanceToXIntercept, distanceToYIntercept) ===
        distanceToXIntercept
          ? xIntercept
          : yIntercept;
      const closestIntercept =
        furthestIntercept === xIntercept ? yIntercept : xIntercept;

      drawingPoints.push({ from, to: closestIntercept });

      const adjustedClosestIntercept =
        closestIntercept === xIntercept
          ? { x: xIntercept.x, y: xIntercept.y === 0 ? dimMaxes.height : 0 }
          : { x: yIntercept.x === 0 ? dimMaxes.width : 0, y: yIntercept.y };
      const furthestInterceptInsideMap =
        furthestIntercept === xIntercept
          ? {
              x: (xIntercept.x + dimMaxes.width) % dimMaxes.width,
              y: xIntercept.y === dimMaxes.height ? dimMaxes.height : 0,
            }
          : {
              x: yIntercept.x === dimMaxes.width ? dimMaxes.width : 0,
              y: (yIntercept.y + dimMaxes.height) % dimMaxes.height,
            };

      drawingPoints.push({
        from: adjustedClosestIntercept,
        to: furthestInterceptInsideMap,
      });

      const adjustedFurthestIntercept =
        furthestIntercept === xIntercept
          ? {
              x: furthestInterceptInsideMap.x,
              y: furthestInterceptInsideMap.y === 0 ? dimMaxes.height : 0,
            }
          : {
              x: furthestInterceptInsideMap.x === 0 ? dimMaxes.width : 0,
              y: furthestInterceptInsideMap.y,
            };

      drawingPoints.push({
        from: adjustedFurthestIntercept,
        to,
      });
    } else if (xInterceptValue && xInterceptValid) {
      drawingPoints.push({ from, to: { x: xInterceptValue, y: 0 } });
      drawingPoints.push({
        from: { x: xInterceptValue, y: dimMaxes.height },
        to,
      });
    } else if (yInterceptValue && yInterceptValid) {
      drawingPoints.push({ from, to: { x: 0, y: yInterceptValue } });
      drawingPoints.push({
        from: { x: dimMaxes.width, y: yInterceptValue },
        to,
      });
    } else {
      drawingPoints.push({ from, to });
    }

    return drawingPoints;
  }

  private static interceptValid(
    y1: number,
    y2: number,
    dimMax: number
  ): boolean {
    return Math.abs(y2 - y1) > dimMax / 2;
  }
}
