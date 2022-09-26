import React, { useState } from 'react';
import {
  TitleScreenContainer,
  TitleContainer,
  TitleText,
  ButtonWrapper,
  PlayerWrapper,
  PlayerText,
  PlayerButton,
} from './title';
import { Button } from '../button';
import numPlayers from '../../game/numPlayers';

const MIN_TOTAL_PLAYERS: number = 2;
const MAX_TOTAL_PLAYERS: number = 4;

function validNumAIPlayers(numHumanPlayers: number, numAIPlayers: number) {
  const minAIPlayers = Math.max(0, MIN_TOTAL_PLAYERS - numHumanPlayers);
  const maxAIPlayers = MAX_TOTAL_PLAYERS - numHumanPlayers;
  return Math.min(maxAIPlayers, Math.max(numAIPlayers, minAIPlayers));
}

function SelectNumPlayers(numHumanPlayers: number, setNumHumanPlayers: React.Dispatch<React.SetStateAction<number>>, 
                          numAIPlayers: number, setNumAIPlayers: React.Dispatch<React.SetStateAction<number>>) {
  const minAIPlayers = Math.max(0, MIN_TOTAL_PLAYERS - numHumanPlayers);
  const maxAIPlayers = MAX_TOTAL_PLAYERS - numHumanPlayers;

  return (
    <>
      <PlayerWrapper>
        <PlayerText>Number of Human Players</PlayerText>
        {[...Array(MAX_TOTAL_PLAYERS + 1)].map((n, i) => (
          <PlayerButton onClick={() => {
              setNumHumanPlayers(i);
              const newNumAIPlayers = validNumAIPlayers(i, numAIPlayers); 
              setNumAIPlayers(newNumAIPlayers);
              numPlayers.numHumanPlayers = i;
              numPlayers.numAIPlayers = newNumAIPlayers}} active={numHumanPlayers === i}>
            {i}
          </PlayerButton>
        ))}
      </PlayerWrapper>
      <PlayerWrapper>
      <PlayerText>Number of AI Players</PlayerText>
      {[...Array(MAX_TOTAL_PLAYERS + 1)].map((n, i) => (
        <PlayerButton onClick={() => {setNumAIPlayers(i); numPlayers.numAIPlayers = i}} active={numAIPlayers === i} disabled={i < minAIPlayers || i > maxAIPlayers}>
          {i}
        </PlayerButton>
      ))}
    </PlayerWrapper>
  </>
  )
}

const Title = () => {
  const [numHumanPlayers, setNumHumanPlayers] = useState(numPlayers.numHumanPlayers);
  const [numAIPlayers, setNumAIPlayers] = useState(numPlayers.numAIPlayers);
  return (
    <>
      <TitleScreenContainer>
        <TitleContainer>
          <TitleText>JOELOPOLY</TitleText>
        </TitleContainer>
        {SelectNumPlayers(numHumanPlayers, setNumHumanPlayers, numAIPlayers, setNumAIPlayers)}
        <ButtonWrapper>
          <Button to={numHumanPlayers > 0 ? "/color" : "/turn"}>START</Button>
        </ButtonWrapper>
      </TitleScreenContainer>
    </>
  );
};

export default Title;
