import React from 'react'
import numPlayers from '../../game/numPlayers';
import game from '../../game/game';

const Turn = () => {
  game.addAIPlayers(numPlayers.numAIPlayers);

  return (
    <>
      {game.rollForFirst().map((roll, i) => <div>{game.players[i].name} rolled a {roll}</div>)}
      <div>
        {game.getCurrentPlayer().name} goes first!
      </div>
    </>
  );
};
  
export default Turn;