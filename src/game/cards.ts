import { COMMUNITY_SERVICE_PAYMENT } from './constants';
import monopoly from './monopoly';
import properties from './properties';

export class Card {
    name: string;
    title: string;
    description: string;
    action: Function;
    
    constructor(name: string, title: string, description: string, action: Function) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.action = action;
    }
}

const trespassing = new Card(
    "trespassing", 
    "You were caught trespassing!",
    "You must go to jail",
    () => {
        monopoly.getCurrentPlayer().goToJail();
        monopoly.state = "endTurn";
    }
)

const bigFoot = new Card(
    "bigFoot",
    "You saw Big Foot!",
    "Go directly to Wind Cave",
    () => {
        for (const property of properties) {
            if (property.name == "Wind Cave") {
                monopoly.getCurrentPlayer().location = property.location;
                break;
            }
        }
        monopoly.state = "square";
    }
)

const lowSupplies = new Card(
    "lowSupplies",
    "You are low on supplies",
    "Go to the nearest utility",
    () => {
        const firstUtilitySpace = 12;
        const secondUtilitySpace = 28;
        if (monopoly.getCurrentPlayer().location < firstUtilitySpace) {
            monopoly.getCurrentPlayer().location = firstUtilitySpace;
            monopoly.state = "square";
        } else if (monopoly.getCurrentPlayer().location < secondUtilitySpace) {
            monopoly.getCurrentPlayer().location = secondUtilitySpace;
            monopoly.state = "square";
        } else {
            monopoly.getCurrentPlayer().location = firstUtilitySpace;
            monopoly.state = "passedGo";
        }
    }
)

const forgotWater = new Card(
    "forgotWater",
    "You forgot your water bottle!",
    "Go back 4 squares",
    () => {
        monopoly.getCurrentPlayer().location = (monopoly.getCurrentPlayer().location - 4) % monopoly.board.length;
        monopoly.state = "square";
    }
)

const adventure = new Card(
    "adventure",
    "You are excited by adventure!",
    "Move ahead 9 squares",
    () => {
        monopoly.getCurrentPlayer().move(9);
        if (monopoly.getCurrentPlayer().passedGo) {
            monopoly.state = "passedGo";
        } else {
            monopoly.state = "square";
        }
    }
)

const littering = new Card(
    "littering",
    "You were caught littering!",
    "Pay a $30 fine",
    () => {
        const fine = 30;
        monopoly.getCurrentPlayer().amountOwed = fine;
        if (monopoly.getCurrentPlayer().money >= fine) {
            monopoly.state = "payTax";
        } else if (monopoly.getCurrentPlayer().assets() < fine) {
            monopoly.state = "loseTax";
        } else {
            monopoly.state = "mortgageTax";
        }
    }
)

const lostChild = new Card(
    "lostChild",
    "You found a lost child!",
    "Collect $30",
    () => {
        monopoly.getCurrentPlayer().money += 30;
        monopoly.state = "endTurn";
    }
)

const freePass = new Card(
    "freePass",
    "You get a free pass!",
    "Head directly to Go",
    () => {
        monopoly.getCurrentPlayer().location = 0;
        monopoly.state = "passedGo";
    }
)

const discovery = new Card(
    "discovery",
    "You discovered new fossils!",
    "Collect $200",
    () => {
        monopoly.getCurrentPlayer().money += 200;
        monopoly.state = "endTurn";
    }
)

const communityService = new Card(
    "communityService",
    "You volunteer for community service",
    "Give each player $20",
    () => {
        const totalPayout = COMMUNITY_SERVICE_PAYMENT * monopoly.players.filter((player) => player.alive).length;
        if (monopoly.getCurrentPlayer().money >= totalPayout) {
            monopoly.state = "payCommunityService";
        } else if (totalPayout > monopoly.getCurrentPlayer().assets()) {
            monopoly.state = "loseTax";
        } else {
            monopoly.state = "mortgageCommunityService";
        }
    }
)

const turnedAround = new Card(
    "turnedAround",
    "You get a little turned around",
    "Turn order reverses",
    () => {
        monopoly.turnOrder *= -1;
        monopoly.state = "endTurn";
    }
)

const meetJoel = new Card(
    "meetJoel",
    "You meet Joel!",
    "",
    () => {
        monopoly.state = "endTurn";
    }
)

const helpPoor = new Card(
    "helpPoor",
    "The rich should help the poor",
    "The richest player must give $100 to the poorest player",
    () => {
        // TODO
    }
)

export const chanceCards = [trespassing, bigFoot, lowSupplies, forgotWater, adventure, littering, lostChild];
export const communityChestCards = [freePass, discovery, communityService, turnedAround, meetJoel, helpPoor];

