import styled from 'styled-components';

export const Button = styled.button`
  appearance: none;
  background-color: #42dfe3;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  margin: 5px;
  &:focus {
    box-shadow: none;
    outline: none;
  }
  &:hover {
    background-color: #32b4b8;
  }
  &:disabled {
    background-color: #bee5e6;
    border-color: rgba(27, 31, 35, 0.1);
    color: rgba(255, 255, 255, 0.8);
    cursor: default;
  }
  &:active {
    background-color: #198e91;
    box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
  }
`;

export const Total = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin: 5px;
  border: solid 1px;
`;

export const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
`;

export const Grid = styled.div`
  border: 30px solid #964b00;
`;

export const GridSquare = styled.div`
  width: 90px;
  height: 90px;
  z-index: 1;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const WireBeadContainer = styled.div`
  position: relative;
`;

export const Wire = styled.div`
  top: 0;
  border-left: 3px solid black;
  height: 90px;
  position: absolute;
  left: 50%;
  margin: auto;
  z-index: 2;
`;

export const Bead = styled.div`
  top: 0;
  height: 70px;
  width: 85px;
  left: 4px;
  border-radius: 90%;
  position: absolute;
  background-color: #ffa500;
  z-index: 3;

  &:hover {
    background-color: #d88a00;
  }
`;

export const Divider = styled.div`
  height: 20px;
  width: 100%;
  background-color: #c0c0c0;
`;

export const Arrow = styled.div`
  border: solid black;
  background-color: green;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
`;

export const UpArrow = styled.div`
  border: solid green;
  border-width: 0 5px 5px 0;
  display: inline-block;
  margin-top: 10px;
  padding: 10px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  z-index: 4;
`;

export const DownArrow = styled.div`
  border: solid green;
  border-width: 0 5px 5px 0;
  display: inline-block;
  padding: 10px;
  margin-top: 35px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  z-index: 4;
`;
