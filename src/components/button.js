import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled(Link)`
  border-radius: 30px;
  background: #ba8c4e;
  white-space: nowrap;
  padding: 20px;
  color: #fef9f3;
  font-size: 4rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.3s;
  width: 40vh;
  text-decoration: none;

  &:hover {
    transform: scale(1.05, 1.05);
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);
  }
`;
