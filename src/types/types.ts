export interface InitialPlayerInfo {
    color: string
}

export interface PlayerSelect {
    numHumanPlayers: number,
    numAIPlayers: number
    playerInfo: [InitialPlayerInfo]
}