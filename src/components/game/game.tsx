import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface divI {
  first: boolean;
}

interface divSideInfoCard {
  maxWidth: number;
}

interface active {
  active: boolean;
}

interface color {
  color: string;
}

interface buildingPosition {
  left: number;
  top: number;
  rotate: number;
}

interface playerName {
  left: number;
  top: number;
  color: string;
}

export const Button = styled(Link)`
  border-radius: 30px;
  background: #ba8c4e;
  white-space: nowrap;
  color: #fef9f3;
  font-size: 4rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40vh;
  text-decoration: none;
`;

export const GameWrapper = styled.div`
  background: #2c3325;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SidebarWrapper = styled.div`
  background: #2c3325;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const SideInfoBox = styled.div<active>`
  background: #cde6d0;
  height: 24vh;
  width: 100vh;
  max-width: 40vh;
  display: flex;
  flex-direction: column;
  border: 8px solid ${({active}) => (active ? '#85ff00' : '#cde6d0')}
`;

export const SideInfoBoxLine = styled.div`
  background: #cde6d0;
  width: 100vh;
  max-width: 40vh;
  display: flex;
  flex-direction: row;
`;

export const SideInfoCardWrapper = styled.img<divSideInfoCard>(
  ({maxWidth}) =>`
  max-height: 100px;
  max-width: ${maxWidth}vh;
`);

export const SideInfo = styled.div<divI>`
  background: #cde6d0;
  width: 100vh;
  max-width: 40vh;
  margin-left: ${({ first }) => (first ? '10px' : '0px')};
`;

export const SideInfoText = styled.h1<color>`
  color: ${({color}) => color};
  font-weight: bold;
  line-height: 20px;
  font-size: 2rem;
`;

export const RollWrapper = styled.div`
  border-radius: 30px;
  background: #ba8c4e;
  height: 12vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 40vh;
  margin-top: 5%;
`;

export const DieWrapper = styled.img`
  height: 10vh;
  width: 10vh;
  border-radius: 1vh;
`;

export const MiddleWrapper = styled.div`
  background: #2c3325;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const TitleText = styled.h1`
  color: #fef9f3;
  font-weight: bold;
  line-height: 10px;
  font-size: 8rem;
`;

export const BoardWrapper = styled.img`
  height: 75vh;
  width: 75vh;
`;

export const PiecesWrapper = styled.div`
  height: 75vh;
  width: 75vh;
`

export const RightWrapper = styled.div`
  color: #2c3325;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5vh 2vh 5vh 0vh;
  overflow-y: auto;
`;

export const ButtonWrapper = styled.div`
  margin-bottom: 5%;
  height: 12%;
`;

export const MessageText = styled.h1`
  color: #fef9f3;
  font-size: 1rem;
`;

export const EventContainer = styled.div`
  color: #2c3325;
  display: flex;
  flex-direction: column;
  justify-content: space-center;
  align-items: space-evenly;
`;

export const EventText = styled.h1`
  color: #fef9f3;
  font-size: 2rem;
`;

export const CardWrapper = styled.img`
  height: 40%;
  max-height: 445px;
  width: auto;
  max-width: 191px;
`;

export const CardPlaceholder = styled.div`
  background: #2c3325;
  height: 40%;
  max-height: 445px;
  width: auto;
  max-width: 191px;
`;

export const PieceContainer = styled.div`
  position: absolute;
  width:75vh;
  height:75vh;
  bottom: 0;
`;

export const BuildingWrapper = styled.img<buildingPosition>`
  position: relative;
  left: ${({left}) => left}%;
  bottom: ${({top}) => -top}%;
  transform: rotate(${({rotate}) => rotate}deg);
  max-height: 1.25vh;
  max-width: 1.25vh
`;

export const NamePieceWrapper = styled.div<playerName>`
  max-height: 1.25vh;
  max-width: 9vh;
  position: relative;
  left: ${({left}) => left}%;
  bottom: ${({top}) => -top}%;
  color: ${({color}) => color};
`;
