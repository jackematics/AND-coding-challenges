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

export const Face = styled.img.attrs((props) => ({
  src: props.src,
}))`
  height: 45px;
  width: 45px;
`;
