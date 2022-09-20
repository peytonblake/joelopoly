import React from 'react';
import {
  TitleScreenContainer,
  TitleContainer,
  TitleText,
  ButtonWrapper,
  PlayerWrapper,
  PlayerText,
  PlayerButton,
} from './titleScreen';
import { Button } from '../button';

const TitleScreen = () => {
  return (
    <>
      <TitleScreenContainer>
        <TitleContainer>
          <TitleText>JOELOPOLY</TitleText>
        </TitleContainer>
        <PlayerWrapper>
          <PlayerText>PLAYERS</PlayerText>
          <PlayerButton>1</PlayerButton>
          <PlayerButton>2</PlayerButton>
          <PlayerButton>3</PlayerButton>
          <PlayerButton>4</PlayerButton>
        </PlayerWrapper>
        <ButtonWrapper>
          <Button>START</Button>
        </ButtonWrapper>
      </TitleScreenContainer>
    </>
  );
};

export default TitleScreen;
