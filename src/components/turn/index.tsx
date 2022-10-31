import React from 'react'
import { Button } from '../button';
import monopoly from '../../game/monopoly';
import { getDiceImage } from '../game';
import { TurnWrapper, ResultsWrapper, StartWrapper, StartText, ButtonWrapper } from '../turn/turn';

const Turn = () => {
  return (
    <>
      <TurnWrapper>
        <StartText>Roll to see who goes first!</StartText>
        <ResultsWrapper>
          {monopoly.rollForFirst().map((roll, i) => (
            <div>
            <StartText>{monopoly.players[i].name}</StartText>
            {getDiceImage(roll)}
            </div>
          ))}
        </ResultsWrapper>
        <StartWrapper>
          <StartText>
            <div>{monopoly.getCurrentPlayer().name} goes first!</div>
          </StartText>
        </StartWrapper>
        <ButtonWrapper>
          <Button to="/game">START</Button>
        </ButtonWrapper>
      </TurnWrapper>
    </>
  );
};
  
export default Turn;