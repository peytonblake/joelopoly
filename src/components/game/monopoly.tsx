import React, { useEffect, useState } from 'react';
import { AI_GO_BONUS, JAIL_PRICE, MINIGAME_PAGES, RICH_HELP_POOR_AMOUNT } from '../../game/constants';
import { Property } from '../../game/properties';
import { Transportation } from '../../game/transportations';
import { Utility } from '../../game/utilities';
import { Tax } from '../../game/taxes';
import monopoly from '../../game/monopoly';
import { ButtonWrapper, Button, MessageText } from './game';
import CardGetter from './cards';
import { displayRoll } from '.';

function squareName(square: Property | Transportation | Utility) {
    if (square instanceof Property) {
        return square.name + " National Park";
    } else {
        return square.name;
    }
}

function houseName(houseNum: number) {
    const houseNames = ['1st House', '2nd House', '3rd House', '4th House', 'Hotel']
    return houseNames[houseNum - 1];
}

export default function MonopolyDisplay(props: {redraw: Function}) {
    const [gameState, setGameState] = useState(monopoly.getState());
    const [die1, setDie1] = useState(monopoly.die1);
    const [die2, setDie2] = useState(monopoly.die2);
    const [redraw, setRedraw] = useState(false);

    useEffect(() => {
        props.redraw();
    }, [gameState, redraw])

    const ai = monopoly.getCurrentPlayer().ai;
    const name = monopoly.getCurrentPlayer().name;

    function buttonWrapper(action: Function) {
        return () => {
            action();
            if (monopoly.getState() == "endTurn") {
                monopoly.endTurn();
            }
            setGameState(monopoly.getState());
            setDie1(monopoly.die1);
            setDie2(monopoly.die2);
            setRedraw(!redraw);
        }
    }

    function Mortgage() {
        const player = monopoly.getMortgagePlayer();
        if (player.ai) {
            if (player.transportations.length > 0) {
                const transportation = player.transportations[0];
                return (
                    <>
                    <MessageText>{player.name} will mortgage {squareName(transportation)}</MessageText>
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.sellTransportation(transportation.name)})}>Mortgage</Button></ButtonWrapper>
                    </>
                )
            } else if (player.utilities.length > 0) {
                const utility = player.utilities[0];
                return (
                    <>
                    <MessageText>{player.name} will mortgage {squareName(utility)}</MessageText>
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.sellUtility(utility.name)})}>Mortgage</Button></ButtonWrapper>
                    </>
                )
            } else {
                const propsWithHouses = player.propertiesWithHouses();
                for (const property of player.properties) {
                    if (!propsWithHouses.includes(property)) {
                        return (
                            <>
                            <MessageText>{player.name} will mortgage {squareName(property)}</MessageText>
                            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.sellProperty(property.name)})}>Mortgage</Button></ButtonWrapper>
                            </>
                        )
                    }
                }
                const property = player.propertyWithGreatestHouses();
                return (
                    <>
                    <MessageText>{player.name} will sell a house on {squareName(property)}</MessageText>
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.sellHouse(property.name)})}>Sell</Button></ButtonWrapper>
                    </>
                ) 
            } 
        } else {
            return (
                <>
                {player.properties.map((property) => (
                    <div key={property.name}>
                    {property.houses == 0 && Math.max(...property.groupProperties.map((property) => property.houses)) == 0 &&
                        <>
                        <MessageText>Mortgage {squareName(property)} for ${property.mortgage}</MessageText>
                        <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.sellProperty(property.name)})}>Mortgage</Button></ButtonWrapper>
                        </>
                    }
                    {property.houses > 0 && property.houses >= Math.max(...property.groupProperties.map((property) => property.houses)) &&
                        <>
                        <MessageText>Sell {houseName(property.houses)} on {squareName(property)} for ${property.pricePerHouse}</MessageText>
                        <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.sellHouse(property.name)})}>Sell</Button></ButtonWrapper>
                        </>
                    }
                    </div>
                ))}
                {player.transportations.map((transportation) => (
                    <div key={transportation.name}>
                    <MessageText>Mortgage {squareName(transportation)} for ${transportation.mortgage}</MessageText>
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.sellTransportation(transportation.name)})}>Mortgage</Button></ButtonWrapper>
                    </div>
                ))}
                {player.utilities.map((utility) => (
                    <div key={utility.name}>
                    <MessageText>Mortgage {squareName(utility)} for ${utility.mortgage}</MessageText>
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.sellUtility(utility.name)})}>Mortgage</Button></ButtonWrapper>
                    </div>
                ))}
                </>
            )
        }
    }

    let display = <></>;
    if (gameState == "start") {
        display = (
            <>
                <MessageText>{name}'s Turn!</MessageText>
                <ButtonWrapper><Button to="/game" onClick={buttonWrapper(() => {monopoly.start()})}>Start Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "won") {
        display = (
            <>
                <MessageText>{name} won!</MessageText>
                <MessageText>Congratulations!</MessageText>
                <ButtonWrapper><Button to="/" onClick={() => {monopoly.won()}}>Done</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "firstChoice") {
        const canBuyHouses = monopoly.getCurrentPlayer().propertiesCanBuyHousesFor().length > 0;
        if (ai) {
            buttonWrapper(() => {monopoly.state = canBuyHouses ? "buyHouses" : "roll"})();     
        } else {
            display = (
                <>
                <MessageText>What would you like to do?</MessageText>
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state="roll"})}>Roll</Button></ButtonWrapper>
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state="mortgageFirst"})}>Mortgage</Button></ButtonWrapper>
                {canBuyHouses && 
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state="buyHouses"})}>Buy</Button></ButtonWrapper>
                }       
                </>
            )
        }
    } else if (gameState == "mortgageFirst") {
        display = (
            <>
            <MessageText>What would you like to mortgage?</MessageText>
            <Mortgage/>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state="firstChoice"})}>Back</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "buyHouses") {
        if (ai) {
            const property = monopoly.getCurrentPlayer().propertiesCanBuyHousesFor()[0];
            display = (
                <>
                <MessageText>{name} will buy the {houseName(property.houses + 1)} for {squareName(property)}</MessageText>
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.buyHouse(property.name)})}>Buy</Button></ButtonWrapper>
                </>
            )
        } else {
            display = (
                <>
                {monopoly.getCurrentPlayer().propertiesCanBuyHousesFor().map((property) => 
                    <>
                    <MessageText>Buy {houseName(property.houses + 1)} for {squareName(property)} for ${property.pricePerHouse}</MessageText>
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.buyHouse(property.name)})}>Buy</Button></ButtonWrapper>
                    </>
                )}
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state = "firstChoice"})}>Back</Button></ButtonWrapper>
                </>
            )
        }
    } else if (gameState == "inJail") {
        const turns = monopoly.getCurrentPlayer().turnsInJail;
        const turnsMsg = `${name} is in jail for ${turns} more turn${turns > 1 ? 's' : ''}`;
        if (ai) {
            display = (
                <>
                <MessageText>{turnsMsg}</MessageText>
                <MessageText>{name} will skip this turn</MessageText>
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.skipTurnInJail()})}>End Turn</Button></ButtonWrapper>
                </>
            )
        } else {
            display = (
                <>
                    <MessageText>{turnsMsg}</MessageText>
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.rollDoublesGetOutOfJail()})}>Roll</Button></ButtonWrapper>
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.skipTurnInJail()})}>Skip Turn</Button></ButtonWrapper>
                    {monopoly.getCurrentPlayer().money >= JAIL_PRICE && 
                        <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.payJailFine()})}>Pay Fine</Button></ButtonWrapper>    
                    }
                </>
            )
        }
    } else if (gameState == "failedRollDoublesGetOutOfJail") {
        display = (
            <>
                <MessageText>{name} did not roll doubles,</MessageText>
                <MessageText>so {name} has to stay in jail</MessageText>
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state = "endTurn"})}>End Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "roll") {
        display = (
            <>
                <MessageText>Roll the dice to move around the board</MessageText>
                <ButtonWrapper><Button to="/game" onClick={buttonWrapper(() => {monopoly.roll()})}>Roll</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "move") {
        display = (
            <>
                <MessageText>{name} rolled a {die1} and a {die2}</MessageText>
                <MessageText>move {die1 + die2} spaces</MessageText>
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => monopoly.move())}>Move</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "square") {
        buttonWrapper(() => {monopoly.square()})();
    } else if (gameState == "ownedSquare") {
        buttonWrapper(() => {monopoly.ownedSquare()})();
    } else if (gameState == "onOwnedSquare") {
        const square = monopoly.getCurrentSquare() as Property | Transportation | Utility;
        display = (
            <>
                <MessageText>{name} landed on {squareName(square)}</MessageText>
                <MessageText>{name} owns this square</MessageText>
                {CardGetter(square.name)}
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state="endTurn"})}>End Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "buySquare") {
        const square = monopoly.getCurrentSquare() as Property | Transportation | Utility;
        if (ai) {
            display = (
                <>
                    <MessageText>{name} landed on {squareName(square)}</MessageText>
                    <MessageText>This square is unowned, {name} will buy it for ${square.price}</MessageText>
                    {CardGetter(square.name)}
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {
                        monopoly.buy();
                        monopoly.state="boughtSquare"
                    })}>Buy</Button></ButtonWrapper>
                </>
            )
        } else {
            display = (
                <>
                    <MessageText>{name} landed on {squareName(square)}</MessageText>
                    <MessageText>This square is unowned, {name} can buy it for ${square.price}</MessageText>
                    {CardGetter(square.name)}
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {
                        monopoly.buy();
                        monopoly.state="boughtSquare"
                    })}>Buy</Button></ButtonWrapper>
                    <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state="endTurn"})}>End Turn</Button></ButtonWrapper>
                </>
            )
        }
    } else if (gameState == "boughtSquare") {
        const square = monopoly.getCurrentSquare() as Property | Transportation | Utility;
        display = (
            <>
                <MessageText>{name} has bought {squareName(square)} for ${square.price}</MessageText>
                {CardGetter(square.name)}
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state="endTurn"})}>End Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "cannotAffordSquare") {
        const square = monopoly.getCurrentSquare() as Property | Transportation | Utility;
        display = (
            <>
                <MessageText>{name} landed on {squareName(square)}</MessageText>
                <MessageText>This square is unowned, and {name} cannot afford to buy it</MessageText>
                {CardGetter(square.name)}
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state="endTurn"})}>End Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "paySquareRent") {
        const square = monopoly.getCurrentSquare() as Property | Transportation | Utility;
        display = (
            <>
                <MessageText>{name} landed on {squareName(square)}</MessageText>
                <MessageText>{name} must pay ${square.getRent()} to {square.ownedBy!.name}</MessageText>
                {CardGetter(square.name)}
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.payRent()})}>Pay</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "mortgageRent") {
        const square = monopoly.getCurrentSquare() as Property | Transportation | Utility;
        const rent = square.getRent();
        display = (
            <>
                <MessageText>{name} landed on {squareName(square)}</MessageText>
                <MessageText>{name} cannot afford the rent of ${rent}</MessageText>
                <MessageText>{name} must mortgage owned squares</MessageText>
                <Mortgage/>
            </>
        )
    } else if (gameState == "loseSquareRent") {
        const square = monopoly.getCurrentSquare() as Property | Transportation | Utility;
        const rent = square.getRent();
        display = (
            <>
            <MessageText>{name} landed on {squareName(square)}</MessageText>
            <MessageText>{name} cannot pay the needed ${rent}</MessageText>
            <MessageText>{name} loses!</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.lose()})}>End Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "tax") {
        buttonWrapper(() => {monopoly.tax()})();
    } else if (gameState == "payTax") {
        const tax = monopoly.getCurrentSquare() as Tax;
        display = (
            <>
            <MessageText>{name} landed on {tax.name}</MessageText>
            <MessageText>{name} must pay ${tax.amount}</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.payBank()})}>Pay</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "loseTax") {
        const tax = monopoly.getCurrentSquare() as Tax;
        display = (
            <>
            <MessageText>{name} landed on {tax.name}</MessageText>
            <MessageText>{name} cannot pay the needed ${tax.amount}</MessageText>
            <MessageText>{name} loses!</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.lose()})}>End Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "mortgageTax") {
        const tax = monopoly.getCurrentSquare() as Tax;
        display = (
            <>
                <MessageText>{name} landed on {tax.name}</MessageText>
                <MessageText>{name} cannot afford the tax of ${tax.amount}</MessageText>
                <MessageText>{name} must mortgage owned squares</MessageText>
                <Mortgage/>
            </>
        )
    } else if (gameState == "passedGo") {
        if (ai) {
            display = (
                <>
                <MessageText>{name} passed Go</MessageText>
                <MessageText>{name} will collect ${AI_GO_BONUS}</MessageText>
                <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.getCurrentPlayer().money += AI_GO_BONUS; monopoly.passedGo()})}>Next</Button></ButtonWrapper>
                </>
            ) 
        } else {
            const miniGame = MINIGAME_PAGES[Math.floor(Math.random() * MINIGAME_PAGES.length)];
            display = (
                <>
                <MessageText>{name} passed Go</MessageText>
                <MessageText>Play a MiniGame</MessageText>
                <ButtonWrapper><Button to={miniGame} onClick={buttonWrapper(() => {monopoly.passedGo()})}>Play</Button></ButtonWrapper>
                </>
            )
        }
    } else if (gameState == "go") {
        display = (
            <>
            <MessageText>{name} landed on Go</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state = "endTurn"})}>End Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "justVisiting") {
        display = (
            <>
            <MessageText>{name} landed on Just Visiting</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state = "endTurn"})}>End Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "freeParking") {
        display = (
            <>
            <MessageText>{name} landed on Free Parking</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.state = "endTurn"})}>End Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "goToJail") {
        display = (
            <>
            <MessageText>{name} landed on Go To Jail!</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.goToJail()})}>Go to Jail</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "speeding") {
        display = (
            <>
            <MessageText>{name} rolled doubles 3 times in a row!</MessageText>
            <MessageText>{name} is sent to jail for speeding</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.speeding()})}>Go to Jail</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "chance") {
        display = (
            <>
            <MessageText>{name} landed on Chance</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.chance()})}>Draw Card</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "communityChest") {
        display = (
            <>
            <MessageText>{name} landed on Community Chest</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.communityChest()})}>Draw Card</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "readCard") {
        display = (
            <>
            <MessageText>{name} drew the card "{monopoly.card!.title}"</MessageText>
            <MessageText>{monopoly.card!.description}</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.doCard()})}>Next</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "payFine") {
        display = (
            <>
            <MessageText>{name} will pay a fine of ${monopoly.getCurrentPlayer().amountOwed}</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.payBank()})}>Pay</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "mortgageFine") {
        display = (
            <>
                <MessageText>{name} cannot afford the fine of ${monopoly.getCurrentPlayer().amountOwed}</MessageText>
                <MessageText>{name} must mortgage owned squares</MessageText>
                <Mortgage/>
            </>
        )
    } else if (gameState == "loseFine") {
        display = (
            <>
            <MessageText>{name} cannot pay the fine of ${monopoly.getCurrentPlayer().amountOwed}</MessageText>
            <MessageText>{name} loses!</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.lose()})}>End Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "payCommunityService") {
        display = (
            <>
            <MessageText>{name} will pay for community service</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.payCommunityService()})}>Pay</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "mortgageCommunityService") {
        display = (
            <>
                <MessageText>{name} cannot afford the community service tax</MessageText>
                <MessageText>{name} must mortgage owned squares</MessageText>
                <Mortgage/>
            </>
        )
    } else if (gameState == "loseCommunityService") {
        display = (
            <>
            <MessageText>{name} cannot pay for community service</MessageText>
            <MessageText>{name} loses!</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.lose()})}>End Turn</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "richHelpPoor") {
        const richestPlayer = monopoly.getRichestPlayer();
        const poorestPlayer = monopoly.getPoorestPlayer();
        display = (
            <>
            <MessageText>The rich should help the poor</MessageText>
            <MessageText>{richestPlayer.name} will give ${RICH_HELP_POOR_AMOUNT} to {poorestPlayer.name}</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.richHelpPoor()})}>Give</Button></ButtonWrapper>
            </>
        )
    } else if (gameState == "mortgageRichHelpPoor") {
        const richestPlayer = monopoly.getRichestPlayer();
        display = (
            <>
            <MessageText>{richestPlayer.name} cannot afford to give ${RICH_HELP_POOR_AMOUNT}</MessageText>
            <MessageText>{richestPlayer.name} must mortgage owned squares</MessageText>
            <Mortgage/>
            </>
        )
    } else if (gameState == "loseRichHelpPoor") {
        const richestPlayer = monopoly.getRichestPlayer();
        display = (
            <>
            <MessageText>{richestPlayer.name} cannot give ${RICH_HELP_POOR_AMOUNT}</MessageText>
            <MessageText>{richestPlayer.name} loses!</MessageText>
            <ButtonWrapper><Button to='/game' onClick={buttonWrapper(() => {monopoly.loseRichestPlayer()})}>End Turn</Button></ButtonWrapper>
            </>
        )
    }

    return (
        <>
            {displayRoll(die1, die2)}
            {display}
        </>
    )
}