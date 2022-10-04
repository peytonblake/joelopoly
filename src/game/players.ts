import { Card } from './cards'
import { Property } from './properties';
import game from './game';

export interface PlayerInit {
    color: string;
    name: string;
    ai: boolean;
}

export class Player {
    color: string;
    name: string;
    ai: boolean;
    location: number = 0;
    money: number = 1500;
    cards: Card[] = [];
    properties: Property[] = [];
    alive: boolean = true;
    passedGo: boolean = false;
    inJail: boolean = false;
    turnsInJail: number = 3;
    rolledDouble: boolean = false;

    constructor(playerInit: PlayerInit) {
        this.color = playerInit.color;
        this.name = playerInit.name;
        this.ai = playerInit.ai;
    }

    move(numPlaces: number) {
        this.location += numPlaces;
        if (this.location >= game.board.length) {
            this.money += 200;
            this.passedGo = true;
        } else {
            this.passedGo = false;
        }
        this.location %= game.board.length;
    }
}

let playerColors = ["green", "red", "yellow", "blue"];
export { playerColors };