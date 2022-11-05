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

interface position {
  left: number;
  bottom: number;
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

export const Zero = styled.h1`
  
  color: white;
  font-size: 2rem;
  position: absolute;
  bottom: 30px;
  right: 590px;
`;

export const One = styled.h1`
  
  color: white;
  font-size: 2rem;
  position: absolute;
  bottom: 30px;
  right: 655px;
`;

export const Two = styled.h1`
  
  color: white;
  font-size: 2rem;
  position: absolute;
  bottom: 30px;
  right: 720px;
`;

export const Three = styled.h1`
  
  color: white;
  font-size: 2rem;
  position: absolute;
  bottom: 30px;
  right: 785px;
`;

export const Four = styled.h1`
  
  color: white;
  font-size: 2rem;
  position: absolute;
  bottom: 30px;
  right: 850px;
`;

export const Five = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 30px;
  right: 915px;
  color: white;
`;

export const Six = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 30px;
  right: 980px;
  color: white;
`;

export const Seven = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 30px;
  right: 1045px;
  color: white;
`;

export const Eight = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 30px;
  right: 1110px;
  color: white;
`;

export const Nine = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 30px;
  right: 1160px;
  color: white;
`;

export const Ten = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 30px;
  right: 1240px;
  color: white;
`;

export const Eleven = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 90px;
  right: 1240px;
  color: white;
`;

export const Twelve = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 150px;
  right: 1240px;
  color: white;
`;

export const Thirteen = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 210px;
  right: 1240px;
  color: white;
`;

export const Fourteen = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 270px;
  right: 1240px;
  color: white;
`;

export const Fifteen = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 330px;
  right: 1240px;
  color: white;
`;

export const Sixteen = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 390px;
  right: 1240px;
  color: white;
`;

export const Seventeen = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 450px;
  right: 1240px;
  color: white;
`;

export const Eighteen = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 510px;
  right: 1240px;
  color: white;
`;

export const Nineteen = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 570px;
  right: 1240px;
  color: white;
`;

export const Twentie = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 630px;
  right: 1240px;
  color: white;
`;

export const Twentieone = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 630px;
  right: 1180px;
  color: white;
`;

export const Twentietwo = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 630px;
  right: 1100px;
  color: white;
`;

export const Twentiethree = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 630px;
  right: 1040px;
  color: white;
`;

export const Twentiefour = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 630px;
  right: 980px;
  color: white;
`;

export const Twentiefive = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 630px;
  right: 920px;
  color: white;
`;

export const Twentiesix = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 630px;
  right: 860px;
  color: white;
`;

export const Twentieseven = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 630px;
  right: 800px;
  color: white;
`;

export const Twentieeight = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 630px;
  right: 740px;
  color: white;
`;

export const Twentienine = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 630px;
  right: 680px;
  color: white;
`;

export const Thirtie = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 630px;
  right: 600px;
  color: white;
`;

export const Thirtieone = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 570px;
  right: 600px;
  color: white;
`;

export const Thirtietwo = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 510px;
  right: 600px;
  color: white;
`;

export const Thirtiethree = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 450px;
  right: 600px;
  color: white;
`;

export const Thirtiefour = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 390px;
  right: 600px;
  color: white;
`;

export const Thirtiefive = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 330px;
  right: 600px;
  color: white;
`;

export const Thirtiesix = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 270px;
  right: 600px;
  color: white;
`;

export const Thirtieseven = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 210px;
  right: 600px;
  color: white;
`;

export const Thirtieeight = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 150px;
  right: 600px;
  color: white;
`;

export const Thirtienine = styled.h1`
  
  
  font-size: 2rem;
  position: absolute;
  bottom: 90px;
  right: 600px;
  color: white;
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

export const HouseContainer = styled.div<position>`
  position: relative;
  left: ${({left}) => left}%;
  bottom: ${({bottom}) => bottom}%
`;

export const HouseWrapper = styled.img`
  max-height: 1.5vh;
  max-width: 1.5vh
`;
