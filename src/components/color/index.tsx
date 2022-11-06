import React, { useState } from 'react';
import { NameBox, ColorContainer, PlayerNameContainer, PlayerName, ButtonWrapper, ColorChooseContainer, ColorButtonContainer, ColorText, ColorButton } from './color';
import { Button } from '../button';
import { playerColors, PlayerInit } from '../../game/players';
import numPlayers from '../../game/numPlayers';
import monopoly from '../../game/monopoly';

const Color = () => {
  const [activeColor, setActiveColor] = useState(0);
  const [availableColors, setAvailableColors] = useState(playerColors);
  const [humanPlayers, setHumanPlayers] = useState<PlayerInit[]>([]);

  return (
    <>
      <ColorContainer>
        <PlayerNameContainer>
          <PlayerName>
            Enter Player Name
          </PlayerName>
          <NameBox
            type="text"
            placeholder={"PLAYER".concat(' ', (humanPlayers.length + 1).toString())}
            id='playerNameInput'
            autoComplete='off'  
          />
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
          <Button to={humanPlayers.length + 1 == numPlayers.numHumanPlayers ? "/turn" : "/color"} onClick={() => {
            humanPlayers.push({name: (document.getElementById('playerNameInput') as HTMLInputElement).value != "" ? (document.getElementById('playerNameInput') as HTMLInputElement).value : 'PLAYER'.concat(' ', (humanPlayers.length + 1).toString()), color: playerColors[activeColor], ai: false});
            setAvailableColors(availableColors.filter(((c, i) => i != activeColor)));
            playerColors.splice(activeColor, 1);
            setActiveColor(0);
            if (humanPlayers.length == numPlayers.numHumanPlayers) {
              monopoly.setUpPlayers(humanPlayers, numPlayers.numAIPlayers);
            }
            (document.getElementById('playerNameInput') as HTMLInputElement).value = 'PLAYER'.concat(' ', (humanPlayers.length + 1).toString())

          }}>NEXT</Button>
        </ButtonWrapper>
      </ColorContainer>
    </>
  );
};

export default Color;
