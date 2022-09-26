import { Card } from './cards'
import { Property } from './properties';

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

    constructor(playerInit: PlayerInit) {
        this.color = playerInit.color;
        this.name = playerInit.name;
        this.ai = playerInit.ai;
    }

    move(places: number) {
    }
}

let playerColors = ["green", "red", "yellow", "blue"];
export { playerColors };