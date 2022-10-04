import React, { useState } from 'react';
import game, { rollDie } from '../../game/game';
import { Property } from '../../game/properties';
import { Transportation } from '../../game/transportations';
import { Tax } from '../../game/taxes';
import { Utility } from '../../game/utilities';
import { CommunityChest, Chance, Go, JustVisiting, FreeParking, GoToJail } from '../../game/squares';
import { Button } from '../button';

function endSquareButton(turnStateSetter: Function, die1Setter: Function, die2Setter: Function) {
  return (
    <>
      <div>
        <Button to="/game" onClick={() => {game.nextTurn(); die1Setter(rollDie()); die2Setter(rollDie()); turnStateSetter('start');}}>End Turn</Button>
      </div>
    </>
  )
}

const Game = () => {
  const [turnState, setTurnState] = useState('start');
  const [die1, setDie1] = useState(rollDie());
  const [die2, setDie2] = useState(rollDie());

  return (
      <>
        {turnState == "start" && 
          <>
            <div>{game.getCurrentPlayer().name}'s Turn!</div>
            <div>
              <Button to="/game" onClick={() => setTurnState("roll")}>Roll</Button>
            </div>
          </>
        }
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
              Moving {game.getCurrentPlayer().name} {die1 + die2} spaces to new location {game.getCurrentPlayer().location}
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
            {game.board[game.getCurrentPlayer().location] instanceof Property &&
              <>
                <div>Landed on a property</div>
                <div>{endSquareButton(setTurnState, setDie1, setDie2)}</div>
              </>
            }
            {game.board[game.getCurrentPlayer().location] instanceof Transportation &&
              <>
                <div>Landed on a transportation</div>
                <div>{endSquareButton(setTurnState, setDie1, setDie2)}</div>
              </>
            }
            {game.board[game.getCurrentPlayer().location] instanceof Tax &&
              <>
                <div>Landed on a tax</div>
                <div>{endSquareButton(setTurnState, setDie1, setDie2)}</div>
              </>
            }
            {game.board[game.getCurrentPlayer().location] instanceof Utility &&
              <>
                <div>Landed on a utility</div>
                <div>{endSquareButton(setTurnState, setDie1, setDie2)}</div>
              </>
            }
            {game.board[game.getCurrentPlayer().location] instanceof CommunityChest &&
              <>
                <div>Landed on a community chest</div>
                <div>{endSquareButton(setTurnState, setDie1, setDie2)}</div>
              </>
            }
            {game.board[game.getCurrentPlayer().location] instanceof Chance &&
              <>
                <div>Landed on a chance</div>
                <div>{endSquareButton(setTurnState, setDie1, setDie2)}</div>
              </>
            }
            {game.board[game.getCurrentPlayer().location] instanceof Go &&
              <>
                <div>Landed on go</div>
                <div>{endSquareButton(setTurnState, setDie1, setDie2)}</div>
              </>
            }
            {game.board[game.getCurrentPlayer().location] instanceof JustVisiting &&
              <>
                <div>Landed on just visiting</div>
                <div>{endSquareButton(setTurnState, setDie1, setDie2)}</div>
              </>
            }
            {game.board[game.getCurrentPlayer().location] instanceof FreeParking &&
              <>
                <div>Landed on free parking</div>
                <div>{endSquareButton(setTurnState, setDie1, setDie2)}</div>
              </>
            }
            {game.board[game.getCurrentPlayer().location] instanceof GoToJail &&
              <>
                <div>Landed on go to jail</div>
                <div>{endSquareButton(setTurnState, setDie1, setDie2)}</div>
              </>
            }
          </>
        }
      </>
    );
  };
  
  export default Game;
  