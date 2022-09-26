import { Player, PlayerInit, playerColors } from './players';

class Game {

    players: Player[] = [];
    currentPlayer: number = 0;
    aiPlayersAdded: boolean = false;

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

    nextTurn() {
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    }

}

function rollDie() {
    return 1 + Math.floor(Math.random() * 5);
}

export function rollDice() {
    return rollDie() + rollDie();
}

const game = new Game();
export default game;