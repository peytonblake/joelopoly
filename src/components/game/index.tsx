import React, { useState } from 'react';
import monopoly from '../../game/monopoly';
import MonopolyDisplay from './monopoly';
import { Player, playerColors } from '../../game/players';
import { GameWrapper, SidebarWrapper, RollWrapper, DieWrapper, MiddleWrapper, 
         TitleText, BoardWrapper, RightWrapper, 
         SideInfoBox, SideInfo, SideInfoText, SideInfoBoxLine, Zero, One, Two, 
         Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven, Twelve, Thirteen, 
         Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twentie, Twentieone, 
         Twentietwo, Twentiethree, Twentiefour, Twentiefive, Twentiesix, Twentieseven, 
         Twentieeight, Twentienine, Thirtie, Thirtieone, Thirtietwo, Thirtiethree, Thirtiefour, 
         Thirtiefive, Thirtiesix, Thirtieseven, Thirtieeight, Thirtienine, Z, Z2, Z3, Z4, Z5, Z6, 
         Z7, Z8, Z9, Z10, Z11, Z12, Z13, Z14, Z15, Z16, Z17, Z18, Z19, Z20, Z21, Z22 } from './game';
import { SideInfoCardGetter } from './cards';
import Dice1 from '../../images/Dice1.png';
import Dice2 from '../../images/Dice2.png';
import Dice3 from '../../images/Dice3.png';
import Dice4 from '../../images/Dice4.png';
import Dice5 from '../../images/Dice5.png';
import Dice6 from '../../images/Dice6.png';
import Board from '../../images/board.png';
import { Property } from '../../game/properties';

function displayOwnedCards(player: Player, maxWidth: number) {
  const cardNames = [];
  for (const property of player.properties) {
    cardNames.push(property.name);
  }
  for (const utility of player.utilities) {
    cardNames.push(utility.name);
  }
  for (const transportation of player.transportations) {
    cardNames.push(transportation.name);
  }
  return (
    <SideInfoBoxLine>
      {cardNames.map((cardName) => SideInfoCardGetter(cardName, maxWidth / cardNames.length))}
    </SideInfoBoxLine>
  )
}

function displayInfo() {
  return (
    <>
    <SidebarWrapper>
      {monopoly.players.map((player: Player) => (player.alive && 
        <SideInfoBox key={player.name} active={player == monopoly.getCurrentPlayer()}>
          <SideInfoBoxLine>
            <SideInfo first={true}><SideInfoText color={player.color}>{player.name}</SideInfoText></SideInfo>
            <SideInfo first={false}><SideInfoText color="#2c3325">${player.money}</SideInfoText></SideInfo>
          </SideInfoBoxLine>
          {displayOwnedCards(player, 40)}
        </SideInfoBox>
      ))}
    </SidebarWrapper>
    </>
  )
}

export function getDiceImage(die: number) {
  switch(die) {
    case 1: { return <DieWrapper src={Dice1} alt="1" /> }
    case 2: { return <DieWrapper src={Dice2} alt="2" /> }
    case 3: { return <DieWrapper src={Dice3} alt="3" /> }
    case 4: { return <DieWrapper src={Dice4} alt="4" /> }
    case 5: { return <DieWrapper src={Dice5} alt="5" /> }
    case 6: { return <DieWrapper src={Dice6} alt="6" /> }
  }
}

export function displayRoll(die1: number, die2: number) {
  return (
    <>
    <RollWrapper>
      {getDiceImage(die1)}
      {getDiceImage(die2)}
    </RollWrapper>
    </>
  )
}

function displayPieces(location: number, name: string, c:string){

  
  switch(location) {

    case 0: { return <Zero color={c}>{name}</Zero>}
    case 1: { return <One color={c}>{name}</One>}
    case 2: { return <Two color={c}>{name}</Two>}
    case 3: { return <Three color={c}>{name}</Three>}
    case 4: { return <Four color={c}>{name}</Four>}
    case 5: { return <Five color={c}>{name}</Five>}
    case 6: { return <Six color={c}>{name}</Six>}
    case 7: { return <Seven color={c}>{name}</Seven>}
    case 8: { return <Eight color={c}>{name}</Eight>}
    case 9: { return <Nine color={c}>{name}</Nine>}
    case 10: { return <Ten color={c}>{name}</Ten>}
    case 11: { return <Eleven color={c}>{name}</Eleven>}
    case 12: { return <Twelve color={c}>{name}</Twelve>}
    case 13: { return <Thirteen color={c}>{name}</Thirteen>}
    case 14: { return <Fourteen color={c}>{name}</Fourteen>}
    case 15: { return <Fifteen color={c}>{name}</Fifteen>}
    case 16: { return <Sixteen color={c}>{name}</Sixteen>}
    case 17: { return <Seventeen color={c}>{name}</Seventeen>}
    case 18: { return <Eighteen color={c}>{name}</Eighteen>}
    case 19: { return <Nineteen color={c}>{name}</Nineteen>}
    case 20: { return <Twentie color={c}>{name}</Twentie>}
    case 21: { return <Twentieone color={c}>{name}</Twentieone>}
    case 22: { return <Twentietwo color={c}>{name}</Twentietwo>}
    case 23: { return <Twentiethree color={c}>{name}</Twentiethree>}
    case 24: { return <Twentiefour color={c}>{name}</Twentiefour>}
    case 25: { return <Twentiefive color={c}>{name}</Twentiefive>}
    case 26: { return <Twentiesix color={c}>{name}</Twentiesix>}
    case 27: { return <Twentieseven color={c}>{name}</Twentieseven>}
    case 28: { return <Twentieeight color={c}>{name}</Twentieeight>}
    case 29: { return <Twentienine color={c}>{name}</Twentienine>}
    case 30: { return <Thirtie color={c}>{name}</Thirtie>}
    case 31: { return <Thirtieone color={c}>{name}</Thirtieone>}
    case 32: { return <Thirtietwo color={c}>{name}</Thirtietwo>}
    case 33: { return <Thirtiethree color={c}>{name}</Thirtiethree>}
    case 34: { return <Thirtiefour color={c}>{name}</Thirtiefour>}
    case 35: { return <Thirtiefive color={c}>{name}</Thirtiefive>}
    case 36: { return <Thirtiesix color={c}>{name}</Thirtiesix>}
    case 37: { return <Thirtieseven color={c}>{name}</Thirtieseven>}
    case 38: { return <Thirtieeight color={c}>{name}</Thirtieeight>}
    case 39: { return <Thirtienine color={c}>{name}</Thirtienine>}
    
    
  }

}









function checkForMorePlayers(){

  if (monopoly.players.length == 4){
    
    return [displayPieces(monopoly.players[3].location, monopoly.players[3].name, monopoly.players[3].color), displayPieces(monopoly.players[2].location, monopoly.players[2].name, monopoly.players[2].color)];
  }
  if (monopoly.players.length == 3){
    return displayPieces(monopoly.players[2].location, monopoly.players[2].name, monopoly.players[2].color);
  }
}


function displayHouses(location: number, name: number, c:string){

  
  switch(location) {

    case 0: { return <Z>{name}</Z>}
    case 1: { return <Z color={c}>{name}</Z>}
    case 2: { return <Two color={c}>{name}</Two>}
    case 3: { return <Z2 color={c}>{name}</Z2>}
    case 4: { return <Four color={c}>{name}</Four>}
    case 5: { return <Five color={c}>{name}</Five>}
    case 6: { return <Z3 color={c}>{name}</Z3>}
    case 7: { return <Seven color={c}>{name}</Seven>}
    case 8: { return <Z4 color={c}>{name}</Z4>}
    case 9: { return <Z5 color={c}>{name}</Z5>}
    case 10: { return <Ten color={c}>{name}</Ten>}
    case 11: { return <Z6 color={c}>{name}</Z6>}
    case 12: { return <Twelve color={c}>{name}</Twelve>}
    case 13: { return <Z7 color={c}>{name}</Z7>}
    case 14: { return <Z8 color={c}>{name}</Z8>}
    case 15: { return <Fifteen color={c}>{name}</Fifteen>}
    case 16: { return <Z9 color={c}>{name}</Z9>}
    case 17: { return <Seventeen color={c}>{name}</Seventeen>}
    case 18: { return <Z10 color={c}>{name}</Z10>}
    case 19: { return <Z11 color={c}>{name}</Z11>}
    case 20: { return <Twentie color={c}>{name}</Twentie>}
    case 21: { return <Z12 color={c}>{name}</Z12>}
    case 22: { return <Twentietwo color={c}>{name}</Twentietwo>}
    case 23: { return <Z13 color={c}>{name}</Z13>}
    case 24: { return <Z14 color={c}>{name}</Z14>}
    case 25: { return <Twentiefive color={c}>{name}</Twentiefive>}
    case 26: { return <Z15 color={c}>{name}</Z15>}
    case 27: { return <Z16 color={c}>{name}</Z16>}
    case 28: { return <Twentieeight color={c}>{name}</Twentieeight>}
    case 29: { return <Z17 color={c}>{name}</Z17>}
    case 30: { return <Thirtie color={c}>{name}</Thirtie>}
    case 31: { return <Z18 color={c}>{name}</Z18>}
    case 32: { return <Z19 color={c}>{name}</Z19>}
    case 33: { return <Thirtiethree color={c}>{name}</Thirtiethree>}
    case 34: { return <Z20 color={c}>{name}</Z20>}
    case 35: { return <Thirtiefive color={c}>{name}</Thirtiefive>}
    case 36: { return <Thirtiesix color={c}>{name}</Thirtiesix>}
    case 37: { return <Z21 color={c}>{name}</Z21>}
    case 38: { return <Thirtieeight color={c}>{name}</Thirtieeight>}
    case 39: { return <Z22 color={c}>{name}</Z22>}
    
    
  }

}

function checkForHouses(){

  let h: Array<Property> = [];
  for (let i = 0; i < 40; i++){
    let h1 = monopoly.board[i] as Property;
    h.push(h1);
  }
  console.log(h);
  return [displayHouses(1,h[1].houses,"#FFFFFF"), displayHouses(3,h[3].houses,"#FFFFFF"), 
        displayHouses(6,h[6].houses,"#FFFFFF"), displayHouses(8,h[8].houses,"#FFFFFF"), 
        displayHouses(9,h[9].houses,"#FFFFFF"), displayHouses(11,h[11].houses,"#FFFFFF"),
        displayHouses(13,h[13].houses,"#FFFFFF"), displayHouses(14,h[14].houses,"#FFFFFF"),
        displayHouses(16,h[16].houses,"#FFFFFF"), displayHouses(18,h[18].houses,"#FFFFFF"),
        displayHouses(19,h[19].houses,"#FFFFFF"), displayHouses(21,h[21].houses,"#FFFFFF"),
        displayHouses(23,h[23].houses,"#FFFFFF"), displayHouses(24,h[24].houses,"#FFFFFF"),
        displayHouses(26,h[26].houses,"#FFFFFF"), displayHouses(27,h[27].houses,"#FFFFFF"),
        displayHouses(29,h[29].houses,"#FFFFFF"), displayHouses(31,h[31].houses,"#FFFFFF"),
        displayHouses(32,h[32].houses,"#FFFFFF"), displayHouses(34,h[34].houses,"#FFFFFF"),
        displayHouses(37,h[37].houses,"#FFFFFF"), displayHouses(39,h[39].houses,"#FFFFFF")
      ];

}

function displayBoard() {
  return (
    <>
    <MiddleWrapper>
      <TitleText>JOELOPOLY</TitleText>
      
      <BoardWrapper src={Board} alt="Board"/>
      {displayPieces(monopoly.players[0].location, monopoly.players[0].name, monopoly.players[0].color)}
      {displayPieces(monopoly.players[1].location, monopoly.players[1].name, monopoly.players[1].color)}
      {checkForMorePlayers()}
      {checkForHouses()}
      
      
      
    </MiddleWrapper>
    
    </>
  )
}



const Game = () => {
  const [refresh, setRefresh] = useState(false);
  function redraw() {setRefresh(!refresh)}

  return (
      <>
      <GameWrapper>
        {displayInfo()}
        {displayBoard()}
        <RightWrapper>
          <MonopolyDisplay redraw={redraw}/>
        </RightWrapper>
      </GameWrapper>
      </>
    );
  };
  
  export default Game;


  
  