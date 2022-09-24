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
import { isPropertySignature } from 'typescript';

const MIN_TOTAL_PLAYERS: number = 2;
const MAX_TOTAL_PLAYERS: number = 4;

function validNumAIPlayers(numHumanPlayers: number, numAIPlayers: number) {
  const minAIPlayers = Math.max(0, MIN_TOTAL_PLAYERS - numHumanPlayers);
  const maxAIPlayers = MAX_TOTAL_PLAYERS - numHumanPlayers;
  return Math.min(maxAIPlayers, Math.max(numAIPlayers, minAIPlayers));
}

function SelectNumPlayers() {
  const [numHumanPlayers, setNumHumanPlayers] = useState(1);
  const [numAIPlayers, setNumAIPlayers] = useState(1);
  const minAIPlayers = Math.max(0, MIN_TOTAL_PLAYERS - numHumanPlayers);
  const maxAIPlayers = MAX_TOTAL_PLAYERS - numHumanPlayers;

  return (
    <>
      <PlayerWrapper>
        <PlayerText>Number of Human Players</PlayerText>
        {[...Array(MAX_TOTAL_PLAYERS + 1)].map((n, i) => (
          <PlayerButton onClick={() => {setNumHumanPlayers(i); setNumAIPlayers(validNumAIPlayers(i, numAIPlayers))}} active={numHumanPlayers === i}>
            {i}
          </PlayerButton>
        ))}
      </PlayerWrapper>
      <PlayerWrapper>
      <PlayerText>Number of AI Players</PlayerText>
      {[...Array(MAX_TOTAL_PLAYERS + 1)].map((n, i) => (
        <PlayerButton onClick={() => setNumAIPlayers(i)} active={numAIPlayers === i} disabled={i < minAIPlayers || i > maxAIPlayers}>
          {i}
        </PlayerButton>
      ))}
    </PlayerWrapper>
  </>
  )
}

const Title = () => {
  return (
    <>
      <TitleScreenContainer>
        <TitleContainer>
          <TitleText>JOELOPOLY</TitleText>
        </TitleContainer>
        <SelectNumPlayers />
        <ButtonWrapper>
          <Button to="/color">START</Button>
        </ButtonWrapper>
      </TitleScreenContainer>
    </>
  );
};

export default Title;
