import React from 'react'
import { Button } from '../button';
import numPlayers from '../../game/numPlayers';
import game from '../../game/game';
import { TurnWrapper, ResultsWrapper, StartWrapper, StartText, ButtonWrapper } from '../turn/turn';

const Turn = () => {
  game.addAIPlayers(numPlayers.numAIPlayers);

  return (
    <>
      <TurnWrapper>
        <ResultsWrapper>
          {game.rollForFirst().map((roll, i) => <div><StartText>{game.players[i].name}</StartText><StartText>{roll}</StartText></div>)}
        </ResultsWrapper>
        <StartWrapper>
          <StartText>
            <div>{game.getCurrentPlayer().name} goes first!</div>
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