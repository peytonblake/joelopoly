import React, { useState } from 'react';
import { Transportation } from "../../game/transportations";
import game from '../../game/game';
import { doneButtonText } from './index';
import { Button, EventText, EventContainer } from '../game/game';


export default function TransportationComponent(props: {done: Function, rerender: Function, bankrupt: Function}) {
  
    const [bought, setBought] = useState(false);
    const t: Transportation = game.getCurrentSquare() as Transportation;

    if (t.ownedBy == game.getCurrentPlayer()) {
        if (bought) {
            return (
                <>
                {/* <EventContainer>
                    <EventText>You have bought {t.name} for ${t.price}</EventText>
                </EventContainer> */}
                <Button to="/game" onClick={() => props.done()}>{doneButtonText()}</Button>
                </>
            )
        } else {
            return (
                <>
                {/* <EventContainer>
                    <EventText>You landed on a transportation, {t.name}, which you own</EventText>
                </EventContainer> */}
                <Button to="/game" onClick={() => props.done()}>{doneButtonText()}</Button>
                </>
            )
        }
    } else if (t.ownedBy == null) {
        return (
            <>
            <EventContainer>
                {/* <EventText>You landed on {t.name} -- ${t.price}</EventText> */}
                <Button to="/game" onClick={() => {
                    t.ownedBy = game.getCurrentPlayer();
                    game.getCurrentPlayer().money -= t.price;
                    setBought(true);
                    props.rerender();
                }}>Buy ${t.price}</Button>
                <Button to="/game" onClick={() => props.done()}>{doneButtonText()}</Button>
            </EventContainer>
            </>
        )
    } else {
        if (game.getCurrentPlayer().money >= t.getRent()) {
            return (
                <>
                {/* <EventContainer>
                    <EventText>You landed on {t.name}, owned by {t.ownedBy.name}</EventText>
                    <EventText>You must pay {t.ownedBy.name} ${t.getRent()}</EventText>
                </EventContainer> */}
                <Button to="/game" onClick={() => {
                    game.getCurrentPlayer().money -= t.getRent();
                    t.ownedBy!.money += t.getRent();
                    props.done();
                }}>Pay ${t.getRent()}</Button>
                </>
            )
        } else {
            return (
                <>
                {/* <EventContainer>
                    <EventText>You landed on {t.name}, owned by {t.ownedBy.name}</EventText>
                    <EventText>You must pay {t.ownedBy.name} ${t.getRent()}, but you only have ${game.getCurrentPlayer().money}!</EventText>
                    <EventText>Pay what you can</EventText>
                </EventContainer> */}
                <Button to="/game" onClick={() => {
                    t.ownedBy!.money += game.getCurrentPlayer().money;
                    game.getCurrentPlayer().money -= t.getRent();
                    game.getCurrentPlayer().bankruptTo = t.ownedBy;
                    props.bankrupt();
                }}>Pay ${t.getRent()}</Button>
                </>
            )
        }
    }
}