import DartboardGenerator from "./dartboard-generator";

describe("DartboardGenerator()", () => {
  it("should throw an exception for n <= 0", () => {
    const exception = () => DartboardGenerator.generate(0);

    expect(exception).toThrowError();
  });
});
