import React from 'react'
import { Button } from '../button';
import monopoly from '../../game/monopoly';
import { TurnWrapper, ResultsWrapper, StartWrapper, StartText, ButtonWrapper } from '../turn/turn';

const Turn = () => {
  return (
    <>
      <TurnWrapper>
        <ResultsWrapper>
          {monopoly.rollForFirst().map((roll, i) => <div><StartText>{monopoly.players[i].name}</StartText><StartText>{roll}</StartText></div>)}
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