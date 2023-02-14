const LangtonsAntUi = () => {
  const grid = Array.from({ length: 7 }, (_) =>
    Array.from({ length: 7 }, (_) => null)
  );

  return (
    <>
      <div className="grid place-items-center">
        {grid.map((row, rowIndex) => (
          <div className="flex flex-row">
            {row.map((col, colIndex) => (
              <div className="h-10 w-10 border border-black">
                {rowIndex === 3 && colIndex === 3 && <img src="ant.svg" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default LangtonsAntUi;
