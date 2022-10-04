import React from 'react'
import { Button } from '../button';
import numPlayers from '../../game/numPlayers';
import game from '../../game/game';

const Turn = () => {
  game.addAIPlayers(numPlayers.numAIPlayers);

  return (
    <>
      {game.rollForFirst().map((roll, i) => <div>{game.players[i].name} (color {game.players[i].color}) rolled a {roll}</div>)}
      <div>
        {game.getCurrentPlayer().name} goes first!
      </div>
      <div>
        <Button to="/game">Play!</Button>
      </div>
    </>
  );
};
  
export default Turn;