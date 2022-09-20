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

const types = ['1', '2', '3', '4'];
function ToggleGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <PlayerWrapper>
      <PlayerText>PLAYERS</PlayerText>
      {types.map((type) => (
        <PlayerButton onClick={() => setActive(type)} active={active === type}>
          {type}
        </PlayerButton>
      ))}
    </PlayerWrapper>
  );
}

const Title = () => {
  return (
    <>
      <TitleScreenContainer>
        <TitleContainer>
          <TitleText>JOELOPOLY</TitleText>
        </TitleContainer>
        <ToggleGroup />
        <ButtonWrapper>
          <Button to="/color">START</Button>
        </ButtonWrapper>
      </TitleScreenContainer>
    </>
  );
};

export default Title;
