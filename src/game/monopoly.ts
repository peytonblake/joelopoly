import { Player } from './players';
import properties, { Property } from './properties';
import squares, { CommunityChest, Chance, Go, JustVisiting, FreeParking, GoToJail } from './squares';
import taxes, { Tax } from './taxes';
import utilities, { Utility } from './utilities';
import transportations, { Transportation } from './transportations';
import { Card, chanceCards, communityChestCards } from './cards';
import { SPEEDING_DOUBLES, JAIL_PRICE, COMMUNITY_SERVICE_PAYMENT } from './constants';

export class Monopoly {

    players: Player[] = [];
    currentPlayer: number = 0;
    board: Array<Property | CommunityChest | Chance | Go | JustVisiting | FreeParking | GoToJail | Tax | Utility | Transportation>;
    state: "needPlayers" | "rollForFirst" | "start" | "roll" | "inJail" | "won" | "speeding" | "square" | "property" | 
           "buyProperty" | "onOwnedProperty" | "cannotAffordProperty" | "payPropertyRent" | 
           "buyTransportation" | "onOwnedTransportation" | "cannotAffordTransportation" | "payTransportationRent" | 
           "buyUtility" | "onOwnedUtility" | "cannotAffordUtility" | "payUtilityRent" | 
           "mortgage" | "lose" | "payTax" | "oweBank" | "payBank"
           | "sellProperties" | "endTurn" | "move" | "oweOtherPlayer" | 
           "payCommunityService" | "oweCommunityService" |
           "passedGo" | "utility" | "tax" | "transportation" | "communityChest" | "chance" | "go" | "justVisiting" |
           "freeParking" | "goToJail" = "needPlayers";
    doublesRolled: number = 0;
    die1: number = 0;
    die2: number = 0;
    turnOrder: number = 1;
    card: Card | null = null;

    constructor() {
        this.board = new Array(40);
        for (const property of properties) {
            this.board[property.location] = property;
        }
        for (const square of squares) {
            this.board[square.location] = square;
        }
        for (const tax of taxes) {
            this.board[tax.location] = tax;
        }
        for (const utility of utilities) {
            this.board[utility.location] = utility;
        }
        for (const transportation of transportations) {
            this.board[transportation.location] = transportation;
        }
    }

    setPlayers(players: Player[]) {
        this.players = players;
        this.state = "rollForFirst";
    }

    rollDice() {
        this.die1 = rollDie();
        this.die2 = rollDie();
    }

    rollForFirst() {
        const options = []
        for (let i = 1; i <= 6; i++) {
            options.push(i);
        }
        let bestRoll = 0;
        let firstPlayer = 0;
        const rolls = [];
        for (let i = 0; i < this.players.length; i++) {
            const rollIndex = Math.floor(Math.random() * options.length)
            const roll = options[rollIndex];
            rolls.push(roll);
            if (roll > bestRoll) {
                bestRoll = roll;
                firstPlayer = i;
            }
            options.splice(rollIndex, 1);
        }
        this.currentPlayer = firstPlayer;
        this.state = "start";
        return rolls;
    }

    start() {
        // check if the player has won
        let won: boolean = true;
        for (const player of this.players) {
            if (player != this.getCurrentPlayer() && player.alive) {
                won = false;
                break;
            }
        }
        if (won) {
            this.state = "won";
        } else if (this.getCurrentPlayer().inJail) {
            this.state = "inJail";
        } else {
            this.state = "roll";
        }
    }

    rollDoublesGetOutOfJail() {
        this.rollDice();
        if (this.die1 == this.die2) {
            this.state = "move";
            this.getCurrentPlayer().inJail = false;
            this.doublesRolled = 1;
        } else {
            this.getCurrentPlayer().waitInJail();
            this.state = "endTurn";
        }
    }

    skipTurnInJail() {
        this.getCurrentPlayer().waitInJail();
        this.state = "endTurn";
    }

    payJailFine() {
        this.getCurrentPlayer().money -= JAIL_PRICE;
        this.getCurrentPlayer().inJail = false;
        this.state = "roll";
    }

    roll() {
        this.rollDice();
        if (this.die1 == this.die2) {
            this.doublesRolled += 1;
        }
        if (this.doublesRolled == SPEEDING_DOUBLES) {
            this.state = "speeding";
        } else {
            this.state = "move";
        }
    }

    speeding() {
        this.getCurrentPlayer().goToJail();
        this.state = "endTurn";
    }

    move() {
        this.getCurrentPlayer().move(this.die1 + this.die2);
        if (this.getCurrentPlayer().passedGo) {
            this.state = "passedGo";
        } else {
            this.state = "square";
        }
    }

    passedGo() {
        this.state = "square";
    }

    square() {
        if (this.getCurrentSquare() instanceof Property) {
            this.state = "property";
        } else if (this.getCurrentSquare() instanceof Transportation) {
            this.state = "transportation";
        } else if (this.getCurrentSquare() instanceof Utility) {
            this.state = "utility";
        } else if (this.getCurrentSquare() instanceof Tax) {
            this.state = "tax";
        } else if (this.getCurrentSquare() instanceof CommunityChest) {
            this.state = "communityChest";
        } else if (this.getCurrentSquare() instanceof Chance) {
            this.state = "chance";
        } else if (this.getCurrentSquare() instanceof Go) {
            this.state = "go";
        } else if (this.getCurrentSquare() instanceof JustVisiting) {
            this.state = "justVisiting";
        } else if (this.getCurrentSquare() instanceof FreeParking) {
            this.state = "freeParking";
        } else {
            this.state = "goToJail";
        }
    }

    property() {
        const property = this.getCurrentSquare() as Property;
        if (property.ownedBy == this.getCurrentPlayer()) {
            this.state = "onOwnedProperty";
        } else if (property.ownedBy == null) {
            if (this.getCurrentPlayer().money >= property.price) {
                this.state = "buyProperty";
            } else {
                this.state = "cannotAffordProperty";
            }
        } else {
            this.state = "payPropertyRent";
        }
    }

    buy() {
        const square = this.getCurrentSquare() as Property | Transportation | Utility;
        this.getCurrentPlayer().money -= square.price;
        square.ownedBy = this.getCurrentPlayer();
        if (square instanceof Property) {
            this.getCurrentPlayer().properties.push(square);
        } else if (square instanceof Transportation) {
            this.getCurrentPlayer().transportations.push(square);
        } else {
            this.getCurrentPlayer().utilities.push(square);
        }
        this.state = "endTurn";
    }

    payRent() {
        const square = this.getCurrentSquare() as Property | Transportation | Utility;
        const rent = square.getRent();
        if (this.getCurrentPlayer().money >= rent) {
            this.getCurrentPlayer().money -= rent;
            square.ownedBy!.money += rent;
        } else {
            if (rent > this.getCurrentPlayer().assets()) {
                this.state = "lose";
            } else {
                this.getCurrentPlayer().owesOtherPlayer = square.ownedBy;
                this.getCurrentPlayer().amountOwed = rent;
                this.state = "oweOtherPlayer";
            }
        }
    }

    sellProperty(propertyName: string) {
        const property = this.getCurrentPlayer().properties.find((property) => property.name == propertyName)!;
        this.getCurrentPlayer().money += property.mortgage;
        const propertyIndex = this.getCurrentPlayer().properties.indexOf(property);
        this.getCurrentPlayer().properties.splice(propertyIndex, 1);
        property.ownedBy = null;
    }

    sellTransportation(transportationName: string) {
        const transportation = this.getCurrentPlayer().transportations.find((t) => t.name == transportationName)!;
        this.getCurrentPlayer().money += transportation.mortgage;
        const transportationIndex = this.getCurrentPlayer().transportations.indexOf(transportation);
        this.getCurrentPlayer().transportations.splice(transportationIndex, 1);
        transportation.ownedBy = null;
    }

    sellUtility(utilityName: string) {
        const utility = this.getCurrentPlayer().utilities.find((utility) => utility.name == utilityName)!;
        this.getCurrentPlayer().money += utility.mortgage;
        const utilityIndex = this.getCurrentPlayer().utilities.indexOf(utility);
        this.getCurrentPlayer().utilities.splice(utilityIndex, 1);
        utility.ownedBy = null;
    }

    payAmountOwed() {
        this.getCurrentPlayer().owesOtherPlayer!.money += this.getCurrentPlayer().amountOwed;
        this.getCurrentPlayer().money -= this.getCurrentPlayer().amountOwed;
        this.getCurrentPlayer().owesOtherPlayer = null;
        this.getCurrentPlayer().amountOwed = 0;
        this.state = "endTurn";
    }

    transportation() {
        const t = this.getCurrentSquare() as Transportation;
        if (t.ownedBy == this.getCurrentPlayer()) {
            this.state = "onOwnedTransportation";
        } else if (t.ownedBy == null) {
            if (this.getCurrentPlayer().money >= t.price) {
                this.state = "buyTransportation";
            } else {
                this.state = "cannotAffordTransportation";
            }
        } else {
            this.state = "payTransportationRent";
        }
    }

    utility() {
        const utility = this.getCurrentSquare() as Utility;
        if (utility.ownedBy == this.getCurrentPlayer()) {
            this.state = "onOwnedUtility";
        } else if (utility.ownedBy == null) {
            if (this.getCurrentPlayer().money >= utility.price) {
                this.state = "buyUtility";
            } else {
                this.state = "cannotAffordUtility";
            }
        } else {
            this.state = "payUtilityRent";
        }
    }

    tax() {
        const tax: Tax = this.getCurrentSquare() as Tax;
        if (this.getCurrentPlayer().money >= tax.amount) {
            this.state = "payTax";
        } else if (tax.amount > this.getCurrentPlayer().assets()) {
            this.state = "lose";
        } else {
            this.getCurrentPlayer().amountOwed = tax.amount;
            this.state = "oweBank";
        }
    }

    payTax() {
        const tax: Tax = this.getCurrentSquare() as Tax;
        this.getCurrentPlayer().money -= tax.amount;
        this.state = "endTurn";
    }

    payBank() {
        this.getCurrentPlayer().money -= this.getCurrentPlayer().amountOwed;
        this.getCurrentPlayer().amountOwed = 0;
        this.state = "endTurn";
    }

    payCommunityService() {
        for (const player of monopoly.players) {
            if (player.alive && player != monopoly.getCurrentPlayer()) {
                player.money += COMMUNITY_SERVICE_PAYMENT;
                monopoly.getCurrentPlayer().money -= COMMUNITY_SERVICE_PAYMENT;
            }
        }
        this.state = "endTurn";
    }

    goToJail() {
        this.getCurrentPlayer().goToJail();
        this.state = "endTurn";
    }

    chance() {
        this.card = chanceCards[Math.floor(Math.random() * chanceCards.length)];
        this.card.action();
    }

    communityChest() {
        this.card = communityChestCards[Math.floor(Math.random() * communityChestCards.length)];
        this.card.action();
    }

    lose() {
        // give everything owned back to the bank and set alive to false
        this.getCurrentPlayer().lose();
        this.state = "endTurn";
    }

    endTurn() {
        // if it should be the next player's turn
        if (this.doublesRolled == 0 || this.doublesRolled == SPEEDING_DOUBLES ||
            !this.getCurrentPlayer().alive || this.getCurrentPlayer().inJail) {
            this.doublesRolled = 0;
            this.currentPlayer = (this.currentPlayer + this.turnOrder) % this.players.length;
        }
        // continue until there is an active player
        while (!this.getCurrentPlayer().alive) {
            this.currentPlayer = (this.currentPlayer + this.turnOrder) % this.players.length;
        }
        this.state = "start";
    }

    getState() {
        return this.state;
    }

    getPlayers() {
        return this.players;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayer];
    }

    getCurrentSquare() {
        return this.board[this.getCurrentPlayer().location];
    }

}

function rollDie() {
    return 1 + Math.floor(Math.random() * 5);
}

const monopoly = new Monopoly();
export default monopoly;
