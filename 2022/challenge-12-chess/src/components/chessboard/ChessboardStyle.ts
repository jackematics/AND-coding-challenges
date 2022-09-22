import styled from 'styled-components';
import TileColour from './tile-colour';

export const BoardWrapper = styled.div`
  display: grid;
  justify-content: center;
`;

export const Board = styled.div`
  border: 3px solid black;
`;

export const TilePieceContainer = styled.div`
  position: relative;
`;

interface BoardTileProps {
  title: string;
  tileColour: TileColour;
}

export const BoardTile = styled.div.attrs((props: BoardTileProps) => ({
  title: props.title,
}))<BoardTileProps>`
  width: 90px;
  height: 90px;
  z-index: 1;
  border: 1px solid black;
  background-color: ${(props) => props.tileColour};
  cursor: pointer;
`;

export const Rank = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const GridPiece = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  height: 75px;
  width: 75px;
  top: 8px;
  right: 8px;
  position: absolute;
  z-index: 2;
`;
