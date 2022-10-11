import React, { useState } from 'react';
import { Transportation } from "../../game/transportations";
import game from '../../game/game';
import { doneButtonText } from './index';
import { Button } from '../button';


export default function TransportationComponent(props: {done: Function, rerender: Function, bankrupt: Function}) {
  
    const [bought, setBought] = useState(false);
    const t: Transportation = game.getCurrentSquare() as Transportation;

    if (t.ownedBy == game.getCurrentPlayer()) {
        if (bought) {
            return (
                <>
                <div>You have bought {t.name} for ${t.price}</div>
                <Button to="/game" onClick={() => props.done()}>{doneButtonText()}</Button>
                </>
            )
        } else {
            return (
                <>
                <div>You landed on a transportation, {t.name}, which you own</div>
                <Button to="/game" onClick={() => props.done()}>{doneButtonText()}</Button>
                </>
            )
        }
    } else if (t.ownedBy == null) {
        return (
            <>
            <div>You landed on a transportation, {t.name}, which you can buy for ${t.price}</div>
            <Button to="/game" onClick={() => {
                t.ownedBy = game.getCurrentPlayer();
                game.getCurrentPlayer().money -= t.price;
                setBought(true);
                props.rerender();
            }}>Buy</Button>
            <Button to="/game" onClick={() => props.done()}>{doneButtonText()}</Button>
            </>
        )
    } else {
        if (game.getCurrentPlayer().money >= t.getRent()) {
            return (
                <>
                <div>You landed on a transportation, {t.name}, which is owned by {t.ownedBy.name}</div>
                <div>You must pay {t.ownedBy.name} ${t.getRent()}</div>
                <Button to="/game" onClick={() => {
                    game.getCurrentPlayer().money -= t.getRent();
                    t.ownedBy!.money += t.getRent();
                    props.done();
                }}>Pay</Button>
                </>
            )
        } else {
            return (
                <>
                <div>You landed on a transportation, {t.name}, which is owned by {t.ownedBy.name}</div>
                <div>You must pay {t.ownedBy.name} ${t.getRent()}, but you have ${game.getCurrentPlayer().money}!</div>
                <div>Pay what you can</div>
                <Button to="/game" onClick={() => {
                    t.ownedBy!.money += game.getCurrentPlayer().money;
                    game.getCurrentPlayer().money -= t.getRent();
                    game.getCurrentPlayer().bankruptTo = t.ownedBy;
                    props.bankrupt();
                }}>Pay</Button>
                </>
            )
        }
    }
}