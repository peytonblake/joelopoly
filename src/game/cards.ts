import { COMMUNITY_SERVICE_PAYMENT } from './constants';
import monopoly from './monopoly';
import properties from './properties';

export class Card {
    title: string;
    action: Function;
    
    constructor(title: string, action: Function) {
        this.title = title;
        this.action = action;
    }
}

const trespassing = new Card(
    "trespassing", 
    () => {
        monopoly.getCurrentPlayer().goToJail();
        monopoly.state = "endTurn";
    }
)

const bigFoot = new Card(
    "bigFoot",
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
    () => {
        monopoly.getCurrentPlayer().location = (monopoly.getCurrentPlayer().location - 4) % monopoly.board.length;
        monopoly.state = "square";
    }
)

const adventure = new Card(
    "adventure",
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
    () => {
        const fine = 30;
        monopoly.getCurrentPlayer().amountOwed = fine;
        if (monopoly.getCurrentPlayer().money >= fine) {
            monopoly.state = "payBank";
        } else if (monopoly.getCurrentPlayer().assets() < fine) {
            monopoly.state = "lose";
        } else {
            monopoly.state = "oweBank";
        }
    }
)

const lostChild = new Card(
    "lostChild",
    () => {
        monopoly.getCurrentPlayer().money += 30;
        monopoly.state = "endTurn";
    }
)

const freePass = new Card(
    "freePass",
    () => {
        monopoly.getCurrentPlayer().location = 0;
        monopoly.state = "passedGo";
    }
)

const discovery = new Card(
    "discovery",
    () => {
        monopoly.getCurrentPlayer().money += 200;
        monopoly.state = "endTurn";
    }
)

const communityService = new Card(
    "communityService",
    () => {
        const totalPayout = COMMUNITY_SERVICE_PAYMENT * monopoly.players.filter((player) => player.alive).length;
        if (monopoly.getCurrentPlayer().money >= totalPayout) {
            monopoly.state = "payCommunityService";
        } else if (totalPayout > monopoly.getCurrentPlayer().assets()) {
            monopoly.state = "lose";
        } else {
            monopoly.state = "oweCommunityService";
        }
    }
)

const turnedAround = new Card(
    "turnedAround",
    () => {
        monopoly.turnOrder *= -1;
        monopoly.state = "endTurn";
    }
)

const meetJoel = new Card(
    "meetJoel",
    () => {
        monopoly.state = "endTurn";
    }
)

export const chanceCards = [trespassing, bigFoot, lowSupplies, forgotWater, adventure, littering, lostChild];
export const communityChestCards = [freePass, discovery, communityService, turnedAround, meetJoel];

