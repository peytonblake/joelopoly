import styled from 'styled-components';

interface ButtonI {
  active: boolean,
  color: string
};

export const ColorContainer = styled.div`
  background: #2c3325;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PlayerNameContainer = styled.div`
  justify-content: center;
  margin-bottom: 10vh;
`;

export const PlayerName = styled.h1`
  color: #fef9f3;
  font-weight: bold;
  line-height: 10px;
  font-size: 8rem;
`;

export const ButtonWrapper = styled.div`
  position: relative;
  height: 10vh;
  font-weight: bold;
  margin-bottom: 20vh;
`;

export const ColorChooseContainer = styled.div`
  position: relative;
`;

export const ColorText = styled.h1`
  color: #fef9f3;
  font-weight: bold;
  line-height: 10px;
  font-size: 2rem;
`;

export const ColorButtonContainer = styled.div`
  position: relative;
  height: 20vh;
  margin-bottom: 10vh;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ColorButton = styled.button<ButtonI>`
  background-color: ${({ active, color }) => (active ? color : 'grey')};
  color: #fef9f3;
  padding: 10px 10px;
  font-size: 20px;
  cursor: pointer;
  height: 8vh;
  width: 8vh;
  border: none;

  &:hover {
    transform: scale(1.05, 1.05);
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);
  }
`;