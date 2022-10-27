import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Sketch from 'react-p5';

export const Button = styled(Link)`
  border-radius: 30px;
  background: #2c3325;
  white-space: nowrap;
  padding: 20px;
  color: #fef9f3;
  font-size: 4rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.3s;
  width: 220vh;
  height: 110vh;
  text-decoration: none;

  &:hover {
    transform: scale(1.05, 1.05);
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);
  }
`;

export const ButtonWrapper = styled.div`
  height: 10vh;
  font-weight: bold;
  margin-bottom: 20vh;
  z-index: -2;
  position: fixed;
  top: -20px;
  left: -20px;
`;
