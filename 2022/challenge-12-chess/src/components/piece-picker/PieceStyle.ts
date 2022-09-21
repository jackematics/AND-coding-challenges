import styled from 'styled-components';

export const Piece = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))<{ highlight: string }>`
  height: 50px;
  width: 50px;
  border: 2px solid black;
  background-color: ${(props) => props.highlight};
  cursor: pointer;
`;
