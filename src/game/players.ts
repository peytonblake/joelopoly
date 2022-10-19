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
    doublesRolled: number = 0;
    goesAgain: boolean = false;
    bankruptTo: Player | null = null;

    constructor(playerInit: PlayerInit) {
        this.color = playerInit.color;
        this.name = playerInit.name;
        this.ai = playerInit.ai;
    }

    manageRoll(die1: number, die2: number) {
        const doubles: boolean = die1 == die2;
        const distance: number = die1 + die2;
        let turnResult = "moving";
        if (this.inJail) {
            if (doubles) {
                this.inJail = false;
                this.doublesRolled = 1;
                this.move(distance);
                this.goesAgain = true;
            } else {
                this.waitInJail();
                turnResult = "endTurn";
            }
        } else {
            if (doubles) {
                this.doublesRolled += 1;
                if (this.doublesRolled == 3) {
                    this.goToJail();
                    turnResult = "speeding";
                } else {
                    this.move(distance);
                    this.goesAgain = true;
                }
            } else {
                this.move(distance);
                this.goesAgain = false;
            }
        }
        return turnResult;
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

    goToJail() {
        this.turnsInJail = 3;
        this.inJail = true;
        this.location = 10;
        this.goesAgain = false;
    }

    waitInJail() {
        this.turnsInJail -= 1;
        if (this.turnsInJail == 0) {
            this.inJail = false;
        }
        this.goesAgain = false;
    }
}

let playerColors = ["green", "red", "yellow", "blue"];
export { playerColors };
