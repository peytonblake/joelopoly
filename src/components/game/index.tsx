import React, { useState } from 'react';
import game, { rollDie } from '../../game/game';
import { Button } from '../button';

const Game = () => {
  const [turnState, setTurnState] = useState('roll');
  const [die1, setDie1] = useState(rollDie());
  const [die2, setDie2] = useState(rollDie());

  return (
      <>
        {turnState == "roll" &&
          <>
            <div>
              {game.getCurrentPlayer().name} at location {game.getCurrentPlayer().location} rolled a {die1} and a {die2}
            </div>
            <div>
              <Button to="/game" onClick={
                () => {setTurnState("moving"); game.getCurrentPlayer().move(die1 + die2)
                }}>Move</Button>
            </div>
          </>
        }
        {turnState == "moving" &&
          <>
            <div>
              Moving {die1 + die2} spaces to new location {game.getCurrentPlayer().location}
            </div>
            {game.getCurrentPlayer().passedGo &&
              <div>
                You passed Go! Collect $200
              </div>
            }
            <div>
              <Button to="/game" onClick={() => setTurnState("square")}>Now what?</Button>
            </div>
          </>
        }
        {turnState == "square" &&
          <>
            {game.board}
            {game.board[game.getCurrentPlayer().location]}
            {
              console.log(game.board, game.board[game.getCurrentPlayer().location])
            }
          </>
        }
      </>
    );
  };
  
  export default Game;
  