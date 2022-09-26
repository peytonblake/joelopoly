import React, { useState } from 'react';
import { ColorContainer, PlayerNameContainer, PlayerName, ButtonWrapper, ColorChooseContainer, ColorButtonContainer, ColorText, ColorButton } from './color';
import { Button } from '../button';
import game from '../../game/game';
import { playerColors } from '../../game/players';
import numPlayers from '../../game/numPlayers';

const Color = () => {
  const [activeColor, setActiveColor] = useState(0);
  const [availableColors, setAvailableColors] = useState(playerColors);

  return (
    <>
      <ColorContainer>
        <PlayerNameContainer>
          <PlayerName>PLAYER {game.players.length + 1} </PlayerName>
        </PlayerNameContainer>
        <ColorChooseContainer>
          <ColorText>CHOOSE YOUR COLOR</ColorText>
        </ColorChooseContainer>
        <ColorButtonContainer>
          {availableColors.map(
            (color, i) => <ColorButton onClick={() => setActiveColor(i)} active={activeColor == i} color={color}/>
          )}
        </ColorButtonContainer>
        <ButtonWrapper>
          <Button to={game.players.length + 1 == numPlayers.numHumanPlayers ? "/turn" : "/color"} onClick={() => {
            game.addPlayer({name: `Joel ${game.players.length + 1}`, color: playerColors[activeColor], ai: false});
            setAvailableColors(availableColors.filter(((c, i) => i != activeColor)));
            playerColors.splice(activeColor, 1);
            setActiveColor(0);
          }}>NEXT</Button>
        </ButtonWrapper>
      </ColorContainer>
    </>
  );
};

export default Color;
