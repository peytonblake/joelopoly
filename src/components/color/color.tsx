import styled from 'styled-components';

interface ButtonI {
  active: boolean,
  color: string
};

export const NameBox = styled.input`
  background-color: #AAAAAA;
  color: #fef9f3;
  display: block;
  margin : 0 auto;
  height: 50px;
  width: 350px;
  font-size: 2rem;
`;

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
  margin-bottom: 4vh;
`;

export const PlayerName = styled.h1`
  color: #fef9f3;
  font-weight: bold;
  line-height: 10px;
  font-size: 3rem;
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
  background-color: ${({color}) => color };
  color: #fef9f3;
  padding: 10px 10px;
  font-size: 20px;
  cursor: pointer;
  height: 10vh;
  width: 10vh;
  border: ${({active}) => active ? "10px solid #AAAAAA" : "none"};

  &:hover {
    transform: scale(1.05, 1.05);
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);
  }
`;

export const SideInfoCardWrapper = styled.img`
  height: 40% !important;
  width: auto !important;
`;

export const RightWrapper = styled.div`
  justify-content: space-between !important;
  height: 90vh !important;
  margin: 5vh 2vh 5vh 0 !important;
`;