import Islands from "./islands.js";
import test from "ava";

test("should have a perimeter of 4 for a single square of land", ({
  deepEqual,
}) => {
  const islandsArray = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];

  const islands = new Islands(islandsArray);

  deepEqual(islands.calculateTotalPerimeter(), 4);
});

test("should have a perimeter of 6 for two horizontal squares of land", ({
  deepEqual,
}) => {
  const islandsArray = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ];

  const islands = new Islands(islandsArray);

  deepEqual(islands.calculateTotalPerimeter(), 6);
});

test("should have a perimeter of 10 for four horizontal squares of land", ({
  deepEqual,
}) => {
  const islandsArray = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0],
  ];

  const islands = new Islands(islandsArray);

  deepEqual(islands.calculateTotalPerimeter(), 10);
});

test("should have a perimeter of 8 for an l-shape", ({ deepEqual }) => {
  const islandsArray = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ];

  const islands = new Islands(islandsArray);

  deepEqual(islands.calculateTotalPerimeter(), 8);
});

test("should have a perimeter of 12 for a c-shape", ({ deepEqual }) => {
  const islandsArray = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ];

  const islands = new Islands(islandsArray);

  deepEqual(islands.calculateTotalPerimeter(), 12);
});

test("should have a perimeter of 8 for two unit islands", ({ deepEqual }) => {
  const islandsArray = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
  ];

  const islands = new Islands(islandsArray);

  deepEqual(islands.calculateTotalPerimeter(), 8);
});

test("should have a perimeter of 16 for two l-shaped islands", ({
  deepEqual,
}) => {
  const islandsArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  const islands = new Islands(islandsArray);

  deepEqual(islands.calculateTotalPerimeter(), 16);
});
