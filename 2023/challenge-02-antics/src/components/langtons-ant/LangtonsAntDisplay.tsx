import AntGridModellerFactory from './ant-grid-modeller-factory';
import AntGridModeller from './hooks/useAntModel/ant-grid-modeller/ant-grid-modeller';
import Grid from './hooks/useAntModel/ant-grid-modeller/grid';
import { PlayState } from './hooks/useAntModel/enums/enums';
import useAntModel from './hooks/useAntModel/useAntModel';

const LangtonsAntDisplay = () => {
  const { antGridData, playState, start, stop, reset } = useAntModel(
    AntGridModellerFactory.createDefaultAntGridModeller()
  );

  return (
    <>
      <div className="mb-3 flex content-evenly justify-center">
        <button
          className="mr-3 w-20 rounded bg-red-600 py-2 px-4 font-bold text-white hover:bg-red-800 disabled:bg-slate-400"
          disabled={playState === PlayState.Start}
        >
          Start
        </button>
        <button
          className="mr-3 w-20 rounded bg-red-600 py-2 px-4 font-bold text-white hover:bg-red-800 disabled:bg-slate-400"
          disabled={playState === PlayState.Stop}
        >
          Stop
        </button>
        <button
          className="w-20 rounded bg-red-600 py-2 px-4 font-bold text-white hover:bg-red-800 disabled:bg-slate-400"
          disabled={playState === PlayState.Start}
        >
          Reset
        </button>
      </div>
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
