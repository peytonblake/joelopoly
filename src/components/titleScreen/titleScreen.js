import styled from 'styled-components';

export const TitleScreenContainer = styled.div`
  background: #2c3325;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled.div`
  justify-content: center;
  margin-bottom: 10vh;
`;

export const TitleText = styled.h1`
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

export const PlayerWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10vh;
  margin-bottom: 10vh;
`;

export const PlayerText = styled.h1`
  color: #fef9f3;
  font-weight: bold;
  font-size: 3rem;
`;

export const PlayerButton = styled.button`
  background-color: ${({ active }) => (active ? 'green' : 'grey')};
  color: #fef9f3;
  padding: 10px 10px;
  font-size: 20px;
  cursor: pointer;
  height: 8vh;
  width: 8vh;
`;
