import { useState } from 'react';
import SorobanCalculator from '../engine/soroban-calculator';
import { replaceAt } from '../utils';
import {
  Bead,
  Button,
  Divider,
  Grid,
  GridSquare,
  GridWrapper,
  Total,
  Row,
  Wire,
  WireBeadContainer,
  UpArrow,
  DownArrow,
} from './SorobanStyle';

const Soroban = () => {
  const [sorobanGrid, setSorobanGrid] = useState<string[]>([
    'OOOOOOO',
    '|||||||',
    '-------',
    '|||||||',
    'OOOOOOO',
    'OOOOOOO',
    'OOOOOOO',
    'OOOOOOO',
  ]);
  const [value, setValue] = useState<number>(
    SorobanCalculator.calculate(sorobanGrid)
  );

  const setCell = (
    symbol: string,
    rowIndex: number,
    columnIndex: number
  ): JSX.Element => {
    switch (symbol) {
      case 'O':
        return (
          <GridSquare>
            <WireBeadContainer>
              <Bead onClick={() => handleBeadClick(rowIndex, columnIndex)}>
                {setArrow(rowIndex, columnIndex)}
              </Bead>
              <Wire />
            </WireBeadContainer>
          </GridSquare>
        );

      case '|':
        return (
          <GridSquare>
            <WireBeadContainer>
              <Wire />
            </WireBeadContainer>
          </GridSquare>
        );

      case '-':
        return <Divider />;

      default:
        throw new Error('Invalid symbol');
    }
  };

  const handleBeadClick = (rowIndex: number, columnIndex: number): void => {
    if (wireAtIndex(rowIndex - 1, columnIndex)) {
      moveBead(rowIndex, columnIndex, -1);
    }

    if (wireAtIndex(rowIndex + 1, columnIndex)) {
      moveBead(rowIndex, columnIndex, +1);
    }
  };

  const setArrow = (rowIndex: number, columnIndex: number): JSX.Element => {
    if (wireAtIndex(rowIndex - 1, columnIndex)) {
      return <UpArrow />;
    }

    if (wireAtIndex(rowIndex + 1, columnIndex)) {
      return <DownArrow />;
    }

    return <></>;
  };

  const wireAtIndex = (rowIndex: number, columnIndex: number) => {
    return (
      sorobanGrid[rowIndex] && sorobanGrid[rowIndex].charAt(columnIndex) === '|'
    );
  };

  const moveBead = (rowIndex: number, columnIndex: number, deltaY: number) => {
    const newPositions = Array.from(sorobanGrid);

    newPositions[rowIndex] = replaceAt(
      newPositions[rowIndex],
      columnIndex,
      '|'
    );
    newPositions[rowIndex + deltaY] = replaceAt(
      newPositions[rowIndex + deltaY],
      columnIndex,
      'O'
    );

    setSorobanGrid(newPositions);
  };

  return (
    <>
      <Button
        onClick={() => setValue(SorobanCalculator.calculate(sorobanGrid))}
      >
        Calculate
      </Button>
      <Total>{value}</Total>
      <GridWrapper>
        <Grid>
          {sorobanGrid.map((row, rowIndex) => (
            <Row>
              {sorobanGrid[rowIndex]
                .split('')
                .map((symbol, columnIndex) =>
                  setCell(symbol, rowIndex, columnIndex)
                )}
            </Row>
          ))}
        </Grid>
      </GridWrapper>
    </>
  );
};

export default Soroban;
