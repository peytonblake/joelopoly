import React, { useState } from 'react';
import { ColorContainer, PlayerNameContainer, PlayerName, ButtonWrapper, ColorChooseContainer, ColorButtonContainer, ColorText, ColorButton } from './color';
import { Button } from '../button';

const Color = () => {
  return (
    <>
      <ColorContainer>
        <PlayerNameContainer>
          <PlayerName>PLAYER x</PlayerName>
        </PlayerNameContainer>
        <ColorChooseContainer>
          <ColorText>CHOOSE YOUR COLOR</ColorText>
        </ColorChooseContainer>
        <ColorButtonContainer>
          <ColorButton active={true} color={"green"}/>
          <ColorButton active={true} color={"red"}/>
          <ColorButton active={true} color={"yellow"}/>
          <ColorButton active={true} color={"blue"}/>
        </ColorButtonContainer>
        <ButtonWrapper>
          <Button to="/color">NEXT</Button>
        </ButtonWrapper>
      </ColorContainer>
    </>
  );
};

export default Color;
