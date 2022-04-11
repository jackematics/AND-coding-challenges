import Islands from "./islands";

describe("islands", () => {
  it("should have a perimeter of 4 for a single square of land", () => {
    const islandsArray = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];

    const islands = new Islands(islandsArray);

    expect(islands.calculatePerimeter()).toBe(4);
  });

  it("should have a perimeter of 6 for two horizontal squares of land", () => {
    const islandsArray = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];

    const islands = new Islands(islandsArray);

    expect(islands.calculatePerimeter()).toBe(6);
  });

  it("should have a perimeter of 10 for four horizontal squares of land", () => {
    const islandsArray = [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    const islands = new Islands(islandsArray);

    expect(islands.calculatePerimeter()).toBe(10);
  });

  it("should have a perimeter of 8 for an l-shape", () => {
    const islandsArray = [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];

    const islands = new Islands(islandsArray);

    expect(islands.calculatePerimeter()).toBe(8);
  });

  it("should have a perimeter of 12 for a c-shape", () => {
    const islandsArray = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];

    const islands = new Islands(islandsArray);

    expect(islands.calculatePerimeter()).toBe(12);
  });

  it("should have a perimeter of 8 for two unit islands", () => {
    const islandsArray = [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ];

    const islands = new Islands(islandsArray);

    expect(islands.calculatePerimeter()).toBe(8);
  });

  it("should have a perimeter of 16 for two l-shaped islands", () => {
    const islandsArray = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];

    const islands = new Islands(islandsArray);

    expect(islands.calculatePerimeter()).toBe(16);
  });
});
