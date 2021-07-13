export const isInsideTriangle = (x1, y1, x2, y2, x3, y3, x, y) => {
    const A = area(x1, y1, x2, y2, x3, y3);
    const A1 = area(x, y, x2, y2, x3, y3);
    const A2 = area(x1, y1, x, y, x3, y3);
    const A3 = area(x1, y1, x2, y2, x, y);

    return (A == A1 + A2 + A3);
}

export const isInsideEllipse = (centreX, centreY, radiuxX, radiusY, x, y) => {
    const p = (parseInt(Math.pow((x - centreX), 2)) / parseInt(Math.pow(radiusY, 2)))
            + (parseInt(Math.pow((y - centreY), 2)) / parseInt(Math.pow(radiuxX, 2)));

    return p <= 1;
}

const area = (x1, y1, x2, y2, x3, y3) => { 
    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
}

