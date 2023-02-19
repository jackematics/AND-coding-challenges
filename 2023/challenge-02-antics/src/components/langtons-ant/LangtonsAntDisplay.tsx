import AntGridModellerFactory from './ant-grid-modeller-factory';
import AntGridModeller from './hooks/useAntModel/ant-grid-modeller/ant-grid-modeller';
import Grid from './hooks/useAntModel/ant-grid-modeller/grid';
import useAntModel from './hooks/useAntModel/useAntModel';

const LangtonsAntDisplay = () => {
  const { antGridData, playState, start, stop, reset } = useAntModel(
    AntGridModellerFactory.createDefaultAntGridModeller()
  );

  return (
    <>
      <div className="grid place-items-center">
        {antGridData.gridData.map((row, rowIndex) => (
          <div className="flex flex-row">
            {row.map((col, colIndex) => (
              <div className="h-10 w-10 border border-black">
                {rowIndex === antGridData.antData.gridIndex.row &&
                  colIndex === antGridData.antData.gridIndex.col && (
                    <img src="ant.svg" />
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default LangtonsAntDisplay;
