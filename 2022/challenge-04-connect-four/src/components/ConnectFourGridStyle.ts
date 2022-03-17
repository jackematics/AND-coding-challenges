import styled from "styled-components";

export const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
`;

export const Grid = styled.div`
  border: 1px solid #1735e3;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const Cell = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color};
  border: 1px solid #000000;
  border-radiux: 50%;
`;
