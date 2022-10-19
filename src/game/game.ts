import { Player, PlayerInit, playerColors } from './players';
import properties, { Property } from './properties';
import squares, { CommunityChest, Chance, Go, JustVisiting, FreeParking, GoToJail } from './squares';
import taxes, { Tax } from './taxes';
import utilities, { Utility } from './utilities';
import transportations, { Transportation } from './transportations';

class Game {

    players: Player[] = [];
    currentPlayer: number = 0;
    aiPlayersAdded: boolean = false;
    board: Array<Property | CommunityChest | Chance | Go | JustVisiting | FreeParking | GoToJail | Tax | Utility | Transportation>;

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

    addPlayer(playerInit: PlayerInit) {
        this.players.push(new Player(playerInit));
    }

    addAIPlayers(numPlayers: number) {
        if (!this.aiPlayersAdded) {
            this.aiPlayersAdded = true;
            for (let i = 0; i < numPlayers; i++) {
                game.addPlayer({name: `Bot ${i + 1}`, color: playerColors[i], ai: true});
            }
        }
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
        return rolls;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayer];
    }

    getCurrentSquare() {
        return this.board[this.getCurrentPlayer().location];
    }

    nextTurn() {
        if (!this.getCurrentPlayer().goesAgain) {
            this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        }
    }

    manageRoll(die1: number, die2: number) {
        const doubles: boolean = die1 == die2;
        const distance: number = die1 + die2;
        if (game.getCurrentPlayer().inJail) {
            if (doubles) {
                game.getCurrentPlayer().inJail = false;
                game.getCurrentPlayer().doublesRolled = 1;
                game.getCurrentPlayer().move(distance);
            } else {
                game.getCurrentPlayer().turnsInJail -= 1;
                if (game.getCurrentPlayer().turnsInJail == 0) {
                    game.getCurrentPlayer().inJail = false;
                }
            }
        } else {
            if (doubles) {

            }
        }
    }

}

export function rollDie() {
    return 1 + Math.floor(Math.random() * 5);
}

/*
export function rolledDouble(die1: number, die2: number) {

    // checks for double rolled
    if (die1 == die2) {
        game.players[game.currentPlayer].rolledDouble = true;
        if (game.players[game.currentPlayer].inJail == true) {
            game.players[game.currentPlayer].inJail == false;
        }
    }
  
    // if double is not rolled turns in jail is subtracted by 1
    if (game.players[game.currentPlayer].inJail == true) {
        game.players[game.currentPlayer].turnsInJail -= 1;
        if (game.players[game.currentPlayer].turnsInJail == 0) {
            game.players[game.currentPlayer].inJail = false;
            game.players[game.currentPlayer].turnsInJail = 3;
        }
    } 
}
*/

const game = new Game();
export default game;