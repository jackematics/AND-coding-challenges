import { useState } from 'react';
import GameAssigner from '../../business-rules/game-assigner';
import Minesweeper from '../../business-rules/minesweeper';
import Difficulty from '../../enums/difficulty';
import MinesweeperDisplay from '../minesweeper-display/MinesweeperDisplay';
import { DifficultyButton as DifficultySelector } from './GameStyle';

const Game = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Beginner);

  const applyDifficultyModifier = () => {
    return {
      [Difficulty.Beginner]: { rows: 9, cols: 9, mines: 10 },
      [Difficulty.Intermediate]: { rows: 16, cols: 16, mines: 40 },
      [Difficulty.Expert]: { rows: 16, cols: 30, mines: 99 },
    }[difficulty];
  };

  const assigner = new GameAssigner(applyDifficultyModifier());
  const minesweeper = new Minesweeper(assigner);

  return (
    <div className="App">
      <DifficultySelector
        title={'beginner'}
        onClick={() => setDifficulty(Difficulty.Beginner)}
      >
        Beginner
      </DifficultySelector>
      <DifficultySelector
        title={'intermediate'}
        onClick={() => setDifficulty(Difficulty.Intermediate)}
      >
        Intermediate
      </DifficultySelector>
      <DifficultySelector
        title={'expert'}
        onClick={() => setDifficulty(Difficulty.Expert)}
      >
        Expert
      </DifficultySelector>
      <div>
        <MinesweeperDisplay minesweeper={minesweeper} difficulty={difficulty} />
      </div>
    </div>
  );
};

export default Game;
