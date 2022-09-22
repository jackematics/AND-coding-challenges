import { useReducer, useState } from 'react';
import Chessboard from '../../engine/chessboard';
import Tile from '../../engine/tile';
import { BoardIndex } from '../../engine/types/board-index';
import PieceType from '../../enums/piece';
import TileColour from '../../enums/tile-colour';
import {
  Board,
  BoardTile,
  BoardWrapper,
  GridPiece,
  Rank,
  TilePieceContainer,
} from './ChessboardStyle';
import { ChessboardProps } from './types/chessboard-props';

const ChessboardDisplay = ({
  chessboard,
  selectedPieceMetadata,
}: ChessboardProps) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const setColour = (boardIndex: BoardIndex): TileColour => {
    return (boardIndex.row + boardIndex.col) % 2 === 1
      ? TileColour.Brown
      : TileColour.White;
  };

  const handleTileClick = (boardIndex: BoardIndex) => {
    chessboard.setSelectedTile(boardIndex, selectedPieceMetadata.type);
    forceUpdate();
  };

  const setBoardTile = (boardIndex: BoardIndex, tile: Tile): JSX.Element => {
    const piece =
      tile.getPiece() === PieceType.Null ? (
        <></>
      ) : (
        <GridPiece
          src={selectedPieceMetadata.src}
          alt={selectedPieceMetadata.alt}
        />
      );

    return (
      <>
        <TilePieceContainer>
          {piece}
          <div
            title={tile.getName()}
            onClick={() => handleTileClick(boardIndex)}
          >
            <BoardTile tileColour={setColour(boardIndex)} />
          </div>
        </TilePieceContainer>
      </>
    );
  };

  return (
    <>
      <BoardWrapper>
        <Board>
          {chessboard.getBoard().map((tileRow, row) => (
            <Rank>
              {chessboard
                .getBoard()
                [row].map((tile, col) => setBoardTile({ row, col }, tile))}
            </Rank>
          ))}
        </Board>
      </BoardWrapper>
    </>
  );
};

export default ChessboardDisplay;
