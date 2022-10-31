import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface divI {
  first: boolean;
}

interface divSideInfoCard {
  maxWidth: number;
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

export const SideInfoBox = styled.div`
  background: #cde6d0;
  height: 24vh;
  width: 100vh;
  max-width: 40vh;
  display: flex;
  flex-direction: column;
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

export const SideInfoText = styled.h1`
  color: #2c3325;
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

export const RightWrapper = styled.div`
  color: #2c3325;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-right: 10px;
`;

export const ButtonWrapper = styled.div`
  margin-bottom: 10vh;
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
  height: 100vh;
  max-height: 445px;
  width: 100vh;
  max-width: 191px;
`;

export const CardPlaceholder = styled.div`
  background: #2c3325;
  height: 100vh;
  max-height: 445px;
  width: 100vh;
  max-width: 191px;
`;
