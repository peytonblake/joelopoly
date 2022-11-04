import React, { useState } from 'react';
import monopoly from '../../game/monopoly';
import MonopolyDisplay from './monopoly';
import { Player } from '../../game/players';
import { GameWrapper, SidebarWrapper, RollWrapper, DieWrapper, MiddleWrapper, 
         TitleText, BoardWrapper, RightWrapper, 
         SideInfoBox, SideInfo, SideInfoText, SideInfoBoxLine, Zero, One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twentie, Twentieone, Twentietwo, Twentiethree, Twentiefour, Twentiefive, Twentiesix, Twentieseven, Twentieeight, Twentienine, Thirtie, Thirtieone, Thirtietwo, Thirtiethree, Thirtiefour, Thirtiefive, Thirtiesix, Thirtieseven, Thirtieeight, Thirtienine } from './game';
import { SideInfoCardGetter } from './cards';
import Dice1 from '../../images/Dice1.png';
import Dice2 from '../../images/Dice2.png';
import Dice3 from '../../images/Dice3.png';
import Dice4 from '../../images/Dice4.png';
import Dice5 from '../../images/Dice5.png';
import Dice6 from '../../images/Dice6.png';
import Board from '../../images/board.png';

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

function displayPieces(location: number, name: string){

  
  switch(location) {

    case 0: { return <Zero>{name}</Zero>}
    case 1: { return <One>{name}</One>}
    case 2: { return <Two>{name}</Two>}
    case 3: { return <Three>{name}</Three>}
    case 4: { return <Four>{name}</Four>}
    case 5: { return <Five>{name}</Five>}
    case 6: { return <Six>{name}</Six>}
    case 7: { return <Seven>{name}</Seven>}
    case 8: { return <Eight>{name}</Eight>}
    case 9: { return <Nine>{name}</Nine>}
    case 10: { return <Ten>{name}</Ten>}
    case 11: { return <Eleven>{name}</Eleven>}
    case 12: { return <Twelve>{name}</Twelve>}
    case 13: { return <Thirteen>{name}</Thirteen>}
    case 14: { return <Fourteen>{name}</Fourteen>}
    case 15: { return <Fifteen>{name}</Fifteen>}
    case 16: { return <Sixteen>{name}</Sixteen>}
    case 17: { return <Seventeen>{name}</Seventeen>}
    case 18: { return <Eighteen>{name}</Eighteen>}
    case 19: { return <Nineteen>{name}</Nineteen>}
    case 20: { return <Twentie>{name}</Twentie>}
    case 21: { return <Twentieone>{name}</Twentieone>}
    case 22: { return <Twentietwo>{name}</Twentietwo>}
    case 23: { return <Twentiethree>{name}</Twentiethree>}
    case 24: { return <Twentiefour>{name}</Twentiefour>}
    case 25: { return <Twentiefive>{name}</Twentiefive>}
    case 26: { return <Twentiesix>{name}</Twentiesix>}
    case 27: { return <Twentieseven>{name}</Twentieseven>}
    case 28: { return <Twentieeight>{name}</Twentieeight>}
    case 29: { return <Twentienine>{name}</Twentienine>}
    case 30: { return <Thirtie>{name}</Thirtie>}
    case 31: { return <Thirtieone>{name}</Thirtieone>}
    case 32: { return <Thirtietwo>{name}</Thirtietwo>}
    case 33: { return <Thirtiethree>{name}</Thirtiethree>}
    case 34: { return <Thirtiefour>{name}</Thirtiefour>}
    case 35: { return <Thirtiefive>{name}</Thirtiefive>}
    case 36: { return <Thirtiesix>{name}</Thirtiesix>}
    case 37: { return <Thirtieseven>{name}</Thirtieseven>}
    case 38: { return <Thirtieeight>{name}</Thirtieeight>}
    case 39: { return <Thirtienine>{name}</Thirtienine>}
    
    
  }

}

function checkFor3(len: number){

  if (len == 3){
    return displayPieces(monopoly.players[2].location, monopoly.players[2].name);
  }
}

function checkFor4(){

  if (monopoly.players.length == 4){
    
    return [displayPieces(monopoly.players[3].location, monopoly.players[3].name), displayPieces(monopoly.players[2].location, monopoly.players[2].name)];
  }
}

function displayBoard() {
  return (
    <>
    <MiddleWrapper>
      <TitleText>JOELOPOLY</TitleText>
      
      <BoardWrapper src={Board} alt="Board"/>
      {displayPieces(monopoly.players[0].location, monopoly.players[0].name)}
      {displayPieces(monopoly.players[1].location, monopoly.players[1].name)}
      {checkFor3(monopoly.players.length)}
      {checkFor4()}
      
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


  
  