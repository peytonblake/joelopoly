import React, { useState } from 'react';
import game, { rollDie } from '../../game/game';
import { Player } from '../../game/players';
import { Property } from '../../game/properties';
import { Transportation } from '../../game/transportations';
import { Tax } from '../../game/taxes';
import { Utility } from '../../game/utilities';
import { CommunityChest, Chance, Go, JustVisiting, FreeParking, GoToJail } from '../../game/squares';
import { JAIL_PRICE } from '../../game/constants';
import TransportationComponent from './transportationGame';
import { Button, GameWrapper, SidebarWrapper, RollWrapper, DieWrapper, MiddleWrapper, 
         TitleText, BoardWrapper, RightWrapper, ButtonWrapper, EventContainer, EventText, 
         SideInfoBox, SideInfo, SideInfoText, CardPlaceholder } from './game';
import CardGetter from './cards';
import Dice1 from '../../images/Dice1.png';
import Dice2 from '../../images/Dice2.png';
import Dice3 from '../../images/Dice3.png';
import Dice4 from '../../images/Dice4.png';
import Dice5 from '../../images/Dice5.png';
import Dice6 from '../../images/Dice6.png';
import Board from '../../images/board.png';

function displayInfo() {
  return (
    <>
    <SidebarWrapper>
      {game.players.map((player: Player) => (
        <>
        <SideInfoBox>
          <SideInfo first={true}><SideInfoText>{player.name}</SideInfoText></SideInfo>
          <SideInfo first={true}><SideInfoText>{player.location}</SideInfoText></SideInfo>
          <SideInfo first={false}><SideInfoText>${player.money}</SideInfoText></SideInfo>
          {/* {player.properties.map((property: Property) => <SideInfoText>{`---Owns ${property.name}`}</SideInfoText>)} */}
        </SideInfoBox>
        </>
      ))}
    </SidebarWrapper>
    </>
  )
}

function getDiceImage(die: number) {
  switch(die) {
    case 1: { return <DieWrapper src={Dice1} alt="1" /> }
    case 2: { return <DieWrapper src={Dice2} alt="2" /> }
    case 3: { return <DieWrapper src={Dice3} alt="3" /> }
    case 4: { return <DieWrapper src={Dice4} alt="4" /> }
    case 5: { return <DieWrapper src={Dice5} alt="5" /> }
    case 6: { return <DieWrapper src={Dice6} alt="6" /> }
  }
}

function displayRoll(die1: number, die2: number) {
  return (
    <>
    <RollWrapper>
      {getDiceImage(die1)}
      {getDiceImage(die2)}
    </RollWrapper>
    </>
  )
}

function displayBoard() {
  return (
    <>
    <MiddleWrapper>
      <TitleText>JOELOPOLY</TitleText>
      <BoardWrapper src={Board} alt="Board"/>
    </MiddleWrapper>
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
      <GameWrapper>
        {displayInfo()}
        {displayBoard()}
        <RightWrapper>
        {displayRoll(die1, die2)}
          {turnState == "start" && 
          <>
            <CardPlaceholder />
            {game.getCurrentPlayer().inJail && setTurnState("inJail")}
            {/* <EventText>{game.getCurrentPlayer().name}'s Turn!</EventText> */}
            <ButtonWrapper>
              <Button to="/game" onClick={() => roll()}>Roll</Button>
            </ButtonWrapper>
          </>
        }
        {turnState == "inJail" &&
          <>
            <CardPlaceholder />
            {/* <EventText>{game.getCurrentPlayer().name} is in Jail for {game.getCurrentPlayer().turnsInJail} more turns</EventText> */}
            {game.getCurrentPlayer().money >= JAIL_PRICE && 
              <ButtonWrapper>
                <Button to="/game" onClick={() => {
                  game.getCurrentPlayer().money -= JAIL_PRICE;
                  game.getCurrentPlayer().inJail = false;
                  roll();
                }}>Pay and Roll</Button>
              </ButtonWrapper>
            }
            <ButtonWrapper>
              <Button to="/game" onClick={() => roll()}>Roll for Doubles</Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button to="/game" onClick={() => {
                game.getCurrentPlayer().waitInJail();
                game.nextTurn();
                setTurnState("start")
              }}>Skip Turn</Button>
            </ButtonWrapper>
          </>
        }
        {turnState == "roll" &&
          <>
            {/* <EventText>
              {game.getCurrentPlayer().name} at location {game.getCurrentPlayer().location} rolled a {die1} and a {die2} 
            </EventText> */}
            <CardPlaceholder />
            <ButtonWrapper>
              <Button to="/game" onClick={() => setTurnState(game.getCurrentPlayer().manageRoll(die1, die2))}>Move</Button>
            </ButtonWrapper>
          </>
        }
        {turnState == "moving" &&
          <>
            {/* <EventText>
              Moving {game.getCurrentPlayer().name} {die1 + die2} spaces to new location {game.getCurrentPlayer().location}
            </EventText> */}
            {/* {game.getCurrentPlayer().passedGo &&
              <EventText>
                You passed Go! Collect $200
              </EventText>
            } */}
            <CardPlaceholder />
            <ButtonWrapper>
              <Button to="/game" onClick={() => setTurnState("square")}>Next</Button>
            </ButtonWrapper>
          </>
        }
        {turnState == "square" &&
          <>
            {game.getCurrentSquare() instanceof Property &&
              <>
                {CardGetter((game.getCurrentSquare() as Property).name)}
                {/* <EventText>Landed on {(game.getCurrentSquare() as Property).name} National Park</EventText> */}
                {(() => {
                  const park: Property = (game.getCurrentSquare() as Property);
                  if (park.ownedBy == game.getCurrentPlayer()) {
                    return (
                    <>
                    {/* <EventText>You own this park</EventText> */}
                    <ButtonWrapper><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></ButtonWrapper>
                    </>
                  )
                  } else if (park.ownedBy == null){
                    return (
                      <>
                      <CardPlaceholder />
                      {/* <EventContainer>
                        <EventText>This park is available to buy for ${park.price}</EventText>
                      </EventContainer> */}
                      <ButtonWrapper><Button to="/game" onClick={() => {
                        game.getCurrentPlayer().money -= park.price;
                        park.ownedBy = game.getCurrentPlayer();
                        game.getCurrentPlayer().properties.push(park);
                        setTurnState("endTurn");
                      }}>Buy ${park.price}</Button></ButtonWrapper>
                      <ButtonWrapper><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></ButtonWrapper>
                      </>
                    )
                  } else {
                    return (
                      <>
                      <CardPlaceholder />
                      {/* <EventText>This Park is owned by {park.ownedBy.name} - You must pay them ${park.getRent()}</EventText> */}
                      <ButtonWrapper><Button to="/game" onClick={() => {
                        game.getCurrentPlayer().money -= park.getRent();
                        park.ownedBy!.money += park.getRent();
                        setTurnState("endTurn");
                      }}>Pay ${park.getRent()}</Button></ButtonWrapper>
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
                <CardPlaceholder />
                {/* <EventText>Landed on a tax</EventText>
                <EventText>{game.getCurrentPlayer().name} has to pay {(game.getCurrentSquare() as Tax).amount}</EventText> */}
                <ButtonWrapper><Button to="/game" onClick={() => {
                  game.nextTurn(); 
                  setTurnState('start');
                  game.getCurrentPlayer().money -= (game.getCurrentSquare() as Tax).amount
                }}>Pay ${(game.getCurrentSquare() as Tax).amount}</Button></ButtonWrapper>
              </>
            }
            {game.getCurrentSquare() instanceof Utility &&
              <>
                <CardPlaceholder />
                {/* <EventText>Landed on a utility</EventText> */}
                <ButtonWrapper><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></ButtonWrapper>
              </>
            }
            {game.getCurrentSquare() instanceof CommunityChest &&
              <>
                <CardPlaceholder />
                {/* <EventText>Landed on a community chest</EventText> */}
                <ButtonWrapper><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></ButtonWrapper>
              </>
            }
            {game.getCurrentSquare() instanceof Chance &&
              <>
                <CardPlaceholder />
                {/* <EventText>Landed on a chance</EventText> */}
                <ButtonWrapper><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></ButtonWrapper>
              </>
            }
            {game.getCurrentSquare() instanceof Go &&
              <>
              <CardPlaceholder />
                {/* <EventText>Landed on go</EventText> */}
                <ButtonWrapper><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></ButtonWrapper>
              </>
            }
            {game.getCurrentSquare() instanceof JustVisiting &&
              <>
              <CardPlaceholder />
                {/* <EventText>Landed on just visiting</EventText> */}
                <ButtonWrapper><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></ButtonWrapper>
              </>
            }
            {game.getCurrentSquare() instanceof FreeParking &&
              <>
              <CardPlaceholder />
                {/* <EventText>Landed on free parking</EventText> */}
                <ButtonWrapper><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></ButtonWrapper>
              </>
            }
            {game.getCurrentSquare() instanceof GoToJail &&
              <>
                <CardPlaceholder />
                {/* <EventText>Go to Jail!</EventText> */}
                {game.getCurrentPlayer().goToJail()}
                <ButtonWrapper><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></ButtonWrapper>
              </>
            }
          </>
          }
          {turnState == "speeding" &&
            <>
            {/* <EventText>You rolled doubles 3 times in a row! You are speeding; go to jail!</EventText> */}
            <CardPlaceholder />
            <ButtonWrapper><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></ButtonWrapper>
            </>
          }
          {turnState == "endTurn" &&
            <>
            {/* {game.players[game.currentPlayer].name} end your turn. */}
            <CardPlaceholder />
            <ButtonWrapper><Button to="/game" onClick={() => {game.nextTurn(); setTurnState('start')}}>End Turn</Button></ButtonWrapper>
            </>
          }
          </RightWrapper>
      </GameWrapper>
      </>
    );
  };
  
  export default Game;
  