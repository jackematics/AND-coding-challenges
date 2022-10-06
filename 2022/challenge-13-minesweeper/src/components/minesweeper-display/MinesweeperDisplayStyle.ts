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

export const Button = styled.button.attrs((props) => ({
  title: props.title,
}))`
  height: 25px;
  width: 25px;
  background-color: #e5e4e4;
  border-top: 3px solid white;
  border-right: 3px solid grey;
  border-bottom: 3px solid grey;
  border-left: 3px solid white;
`;
