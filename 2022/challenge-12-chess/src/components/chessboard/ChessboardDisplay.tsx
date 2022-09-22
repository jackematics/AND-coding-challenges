import { useEffect, useReducer, useRef, useState } from 'react';
import Tile from '../../engine/tile';
import { BoardIndex } from '../../engine/types/board-index';
import PieceType from '../../engine/pieces/enum/piece';
import TileColour from './tile-colour';
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
  const validTileIndexes = useRef<BoardIndex[]>([]);

  useEffect(() => {
    validTileIndexes.current = [];
    forceUpdate();
  }, [selectedPieceMetadata]);

  const setColour = (boardIndex: BoardIndex): TileColour => {
    let colour =
      (boardIndex.row + boardIndex.col) % 2 === 1
        ? TileColour.Brown
        : TileColour.White;

    if (
      validTileIndexes.current.find(
        (index) => index.row === boardIndex.row && index.col === boardIndex.col
      )
    ) {
      colour = TileColour.Green;
    }

    return colour;
  };

  const handleTileClick = (boardIndex: BoardIndex) => {
    chessboard.setSelectedTilePiece(boardIndex, selectedPieceMetadata.type);
    validTileIndexes.current = chessboard.getValidTileIndexes(boardIndex);

    forceUpdate();
  };

  const setBoardTile = (boardIndex: BoardIndex, tile: Tile): JSX.Element => {
    const piece =
      tile.getPieceType() === PieceType.Null ? (
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
          <BoardTile
            title={tile.getName()}
            tileColour={setColour(boardIndex)}
            onClick={() => handleTileClick(boardIndex)}
          />
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
