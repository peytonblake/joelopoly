import React, { useState } from 'react';
import game, { rollDie } from '../../game/game';
import { Player } from '../../game/players';
import { Property } from '../../game/properties';
import { Transportation } from '../../game/transportations';
import { Tax } from '../../game/taxes';
import { Utility } from '../../game/utilities';
import { CommunityChest, Chance, Go, JustVisiting, FreeParking, GoToJail } from '../../game/squares';
import { Button } from '../button';
import { JAIL_PRICE } from '../../game/constants';
import TransportationComponent from './transportationGame';


function displayInfo(die1: number, die2: number) {
  return (
    <>
      {game.players.map((player: Player) => (
        <>
        <div>{player.name} is at location {player.location} and has ${player.money}</div>
        {player.properties.map((property: Property) => <div>{`---Owns ${property.name}`}</div>)}
        </>
      ))}
      <div>It is currently {game.getCurrentPlayer().name}'s Turn</div>
      <div>Die 1: {die1 > 0 ? die1 : ''} Die 2: {die2 > 0 ? die2 : ''}</div>
      <div>{"________________________"}</div>
    </>
  )
}

export function doneButtonText() {
  if (game.getCurrentPlayer().goesAgain) {
    return "Roll Again";
  }
  return "End Turn";
}

const Game = () => {
  const [turnState, setTurnState] = useState('start');
  const [die1, setDie1] = useState(0);
  const [die2, setDie2] = useState(0);
  const [update, setUpdate] = useState(false);

  function roll() {
    setDie1(rollDie());
    setDie2(rollDie());
    setTurnState("roll");
  }

  function doneWithSquare() {
    game.nextTurn();
    if (game.getCurrentPlayer().goesAgain) {
      roll();
    } else {
      setTurnState("start");
    }
  }

  function rerender() {
    setUpdate(!update);
  }

  function bankrupt() {
    setTurnState("bankrupt");
  }

  return (
      <>
        {displayInfo(die1, die2)}
        {turnState == "start" && 
          <>
            {game.getCurrentPlayer().inJail && setTurnState("inJail")}
            <div>{game.getCurrentPlayer().name}'s Turn!</div>
            <div>
              <Button to="/game" onClick={() => roll()}>Roll</Button>
            </div>
          </>
        }
        {turnState == "inJail" &&
          <>
            <div>{game.getCurrentPlayer().name} is in Jail for {game.getCurrentPlayer().turnsInJail} more turns</div>
            {game.getCurrentPlayer().money >= JAIL_PRICE && 
              <div>
                <Button to="/game" onClick={() => {
                  game.getCurrentPlayer().money -= JAIL_PRICE;
                  game.getCurrentPlayer().inJail = false;
                  roll();
                }}>Pay and Roll</Button>
              </div>
            }
            <div>
              <Button to="/game" onClick={() => roll()}>Roll for Doubles</Button>
            </div>
            <div>
              <Button to="/game" onClick={() => {
                game.getCurrentPlayer().waitInJail();
                game.nextTurn();
                setTurnState("start")
              }}>Skip Turn</Button>
            </div>
          </>
        }
        {turnState == "roll" &&
          <>
            <div>
              {game.getCurrentPlayer().name} at location {game.getCurrentPlayer().location} rolled a {die1} and a {die2} 
            </div>
            <div>
              <Button to="/game" onClick={() => setTurnState(game.getCurrentPlayer().manageRoll(die1, die2))}>Move</Button>
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
            {game.getCurrentSquare() instanceof Property &&
              <>
                <div>Landed on a property - {(game.getCurrentSquare() as Property).name} National Park</div>
                {(() => {
                  const park: Property = (game.getCurrentSquare() as Property);
                  if (park.ownedBy == game.getCurrentPlayer()) {
                    return (
                    <>
                    <div>You own this park</div>
                    <div><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>Nice, end turn</Button></div>
                    </>
                  )
                  } else if (park.ownedBy == null){
                    return (
                      <>
                      <div>This park is available to buy for ${park.price} - Would you like to buy it?</div>
                      <div><Button to="/game" onClick={() => {
                        game.getCurrentPlayer().money -= park.price;
                        park.ownedBy = game.getCurrentPlayer();
                        game.getCurrentPlayer().properties.push(park);
                        setTurnState("endTurn");
                      }}>Yes</Button></div>
                      <div><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>No thanks, end turn</Button></div>
                      </>
                    )
                  } else {
                    return (
                      <>
                      <div>This Park is owned by {park.ownedBy.name} - You must pay them ${park.getRent()}</div>
                      <div><Button to="/game" onClick={() => {
                        game.getCurrentPlayer().money -= park.getRent();
                        park.ownedBy!.money += park.getRent();
                        setTurnState("endTurn");
                      }}>Pay</Button></div>
                      </>
                    )
                  }
                })()
                }
              </>
            }
            {game.getCurrentSquare() instanceof Transportation && <TransportationComponent done={doneWithSquare} rerender={rerender} bankrupt={bankrupt}/>}
            {game.getCurrentSquare() instanceof Tax &&
              <>
                <div>Landed on a tax</div>
                <div>Player {game.getCurrentPlayer().name} has to pay {(game.getCurrentSquare() as Tax).amount}</div>
                <div><Button to="/game" onClick={() => {
                  game.nextTurn(); 
                  setTurnState('start');
                  game.getCurrentPlayer().money -= (game.getCurrentSquare() as Tax).amount
                }}>Pay and end turn</Button></div>
              </>
            }
            {game.getCurrentSquare() instanceof Utility &&
              <>
                <div>Landed on a utility</div>
                <div><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></div>
              </>
            }
            {game.getCurrentSquare() instanceof CommunityChest &&
              <>
                <div>Landed on a community chest</div>
                <div><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></div>
              </>
            }
            {game.getCurrentSquare() instanceof Chance &&
              <>
                <div>Landed on a chance</div>
                <div><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></div>
              </>
            }
            {game.getCurrentSquare() instanceof Go &&
              <>
                <div>Landed on go</div>
                <div><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></div>
              </>
            }
            {game.getCurrentSquare() instanceof JustVisiting &&
              <>
                <div>Landed on just visiting</div>
                <div><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></div>
              </>
            }
            {game.getCurrentSquare() instanceof FreeParking &&
              <>
                <div>Landed on free parking</div>
                <div><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></div>
              </>
            }
            {game.getCurrentSquare() instanceof GoToJail &&
              <>
                <div>Go to Jail!</div>
                {game.getCurrentPlayer().goToJail()}
                <div><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></div>
              </>
            }
          </>
          }
          {turnState == "speeding" &&
            <>
            <div>You rolled doubles 3 times in a row! You are speeding; go to jail!</div>
            <div><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></div>
            </>
          }
          {turnState == "endTurn" &&
            <>
            {game.players[game.currentPlayer].name} end your turn.
            <div><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></div>
            </>
          }
      </>
    );
  };
  
  export default Game;
  