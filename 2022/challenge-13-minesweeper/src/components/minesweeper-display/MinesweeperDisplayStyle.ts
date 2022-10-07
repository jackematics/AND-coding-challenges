import styled from 'styled-components';

export const BoardWrapper = styled.div`
  display: grid;
  justify-content: center;
`;

export const Board = styled.div`
  border: 3px solid #5a5a5a;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

interface TileDisplayProps {
  title: string;
  tileStyle: TileStyle;
}

export const TileDisplay = styled.button.attrs((props: TileDisplayProps) => ({
  title: props.title,
}))<TileDisplayProps>`
  height: 25px;
  width: 25px;
  background-color: ${(props) => props.tileStyle.backgroundColour};
  border-top: ${(props) => props.tileStyle.borderTop};
  border-right: ${(props) => props.tileStyle.borderRight};
  border-bottom: ${(props) => props.tileStyle.borderBottom};
  border-left: ${(props) => props.tileStyle.borderLeft};
`;
