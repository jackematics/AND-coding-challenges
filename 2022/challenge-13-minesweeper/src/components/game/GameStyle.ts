import styled from 'styled-components';

export const DifficultyButton = styled.button`
  appearance: none;
  background-color: #eded09;
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
    background-color: #c9c916;
  }
  &:active {
    background-color: #a6a61e;
    box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
  }
`;
