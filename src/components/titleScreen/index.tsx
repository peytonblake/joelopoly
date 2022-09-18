import React from 'react';
import {
  TitleScreenContainer,
  TitleContainer,
  TitleText,
  ButtonWrapper,
} from './titleScreen';
import { Button } from '../button';

const TitleScreen = () => {
  return (
    <>
      <TitleScreenContainer>
        <TitleContainer>
          <TitleText>JOELOPOLY</TitleText>
        </TitleContainer>
        <ButtonWrapper>
          <Button to="/">START</Button>
        </ButtonWrapper>
      </TitleScreenContainer>
    </>
  );
};

export default TitleScreen;
