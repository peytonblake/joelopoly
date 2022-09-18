import styled from 'styled-components';

export const TitleScreenContainer = styled.div`
  background: #2c3325;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
`;

export const TitleText = styled.h1`
  color: #fef9f3;
  font-weight: bold;
  line-height: 10px;
  text-align: center;
  font-size: 8rem;
  position: relative;
  margin-top: 20vh;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  margin-top: 70vh;
  height: 10vh;
  font-weight: bold;
`;
