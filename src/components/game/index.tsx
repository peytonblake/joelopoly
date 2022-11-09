import React, { useState } from 'react';
import monopoly from '../../game/monopoly';
import MonopolyDisplay from './monopoly';
import { Player } from '../../game/players';
import {
  GameWrapper,
  SidebarWrapper,
  RollWrapper,
  DieWrapper,
  MiddleWrapper,
  TitleText,
  BoardWrapper,
  RightWrapper,
  SideInfoBox,
  SideInfo,
  SideInfoText,
  SideInfoBoxLine,
  PiecesWrapper,
} from './game';
import { SideInfoCardGetter } from './cards';
import { Buildings, Players } from './pieces';
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
      {cardNames.map((cardName) =>
        SideInfoCardGetter(cardName, maxWidth / cardNames.length)
      )}
    </SideInfoBoxLine>
  );
}

function displayInfo() {
  return (
    <>
      <SidebarWrapper>
        {monopoly.players.map(
          (player: Player) =>
            player.alive && (
              <SideInfoBox
                key={player.name}
                active={player == monopoly.getCurrentPlayer()}
              >
                <SideInfoBoxLine>
                  <SideInfo first={true}>
                    <SideInfoText color={player.color}>
                      {player.name}
                    </SideInfoText>
                  </SideInfo>
                  <SideInfo first={false}>
                    <SideInfoText color="#2c3325">${player.money}</SideInfoText>
                  </SideInfo>
                </SideInfoBoxLine>
                {displayOwnedCards(player, 40)}
              </SideInfoBox>
            )
        )}
      </SidebarWrapper>
    </>
  );
}

export function getDiceImage(die: number) {
  switch (die) {
    case 1: {
      return <DieWrapper src={Dice1} alt="1" />;
    }
    case 2: {
      return <DieWrapper src={Dice2} alt="2" />;
    }
    case 3: {
      return <DieWrapper src={Dice3} alt="3" />;
    }
    case 4: {
      return <DieWrapper src={Dice4} alt="4" />;
    }
    case 5: {
      return <DieWrapper src={Dice5} alt="5" />;
    }
    case 6: {
      return <DieWrapper src={Dice6} alt="6" />;
    }
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
  );
}

function displayBoard() {
  return (
    <>
      <MiddleWrapper>
        <TitleText>JOELOPOLY</TitleText>
        <PiecesWrapper>
          <BoardWrapper src={Board} alt="Board" />
          <Buildings />
          <Players players={monopoly.players} />
        </PiecesWrapper>
      </MiddleWrapper>
    </>
  );
}

const Game = () => {
  const [refresh, setRefresh] = useState(false);
  function redraw() {
    setRefresh(!refresh);
  }

  return (
    <>
      <GameWrapper>
        {displayInfo()}
        {displayBoard()}
        <RightWrapper>
          <MonopolyDisplay redraw={redraw} />
        </RightWrapper>
      </GameWrapper>
    </>
  );
};

export default Game;
