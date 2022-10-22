import { Card } from './cards'
import { Property } from './properties';
import game from './game';
import { Transportation } from './transportations';
import { Utility } from './utilities';
import { TURNS_IN_JAIL } from './constants';

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
    transportations: Transportation[] = []
    utilities: Utility[] = []
    alive: boolean = true;
    passedGo: boolean = false;
    inJail: boolean = false;
    turnsInJail: number = 3;
    owesOtherPlayer: Player | null = null;
    amountOwed: number = 0;

    constructor(playerInit: PlayerInit) {
        this.color = playerInit.color;
        this.name = playerInit.name;
        this.ai = playerInit.ai;
    }

    move(numPlaces: number) {
        this.location += numPlaces;
        if (this.location >= game.board.length) {
            this.passedGo = true;
        } else {
            this.passedGo = false;
        }
        this.location %= game.board.length;
    }

    goToJail() {
        this.turnsInJail = TURNS_IN_JAIL;
        this.inJail = true;
        this.location = 10;
    }

    waitInJail() {
        this.turnsInJail -= 1;
        if (this.turnsInJail == 0) {
            this.inJail = false;
        }
    }

    assets() {
        let assets = this.money;
        for (const property of this.properties) {
            assets += property.mortgage;
        }
        for (const utility of this.utilities) {
            assets += utility.mortgage;
        }
        for (const transportation of this.transportations) {
            assets += transportation.mortgage;
        }
        return assets;
    }

    lose() {
        for (const property of this.properties) {
            property.ownedBy = null;
        }
        for (const utility of this.utilities) {
            utility.ownedBy = null;
        }
        for (const transportation of this.transportations) {
            transportation.ownedBy = null;
        }
        this.alive = false;
    }
}

let playerColors = ["green", "red", "yellow", "blue"];
export { playerColors };
