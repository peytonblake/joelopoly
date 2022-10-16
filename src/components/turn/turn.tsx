import styled from 'styled-components';

export const TurnWrapper = styled.div`
  background: #2c3325;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ResultsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-diection: row;
  align-items: center;
  justify-content: space-around;
  column-gap: 10vh;
`;

export const StartWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 5vh;
  margin-bottom: 5vh;
`;

export const StartText = styled.h1`
  color: #fef9f3;
  font-weight: bold;
  font-size: 3rem;
`;

export const ButtonWrapper = styled.div`
  position: relative;
  height: 10vh;
  font-weight: bold;
  margin-bottom: 20vh;
`;