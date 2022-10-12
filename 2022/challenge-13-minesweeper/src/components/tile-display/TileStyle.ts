import styled from 'styled-components';

export const TileImage = styled.img.attrs((props) => ({
  src: props.src,
}))`
  height: 25px;
  width: 25px;
`;
