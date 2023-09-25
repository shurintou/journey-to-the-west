export interface GameResultsList {
    id: number,
    nickname: string,
    cards: number,
    avatar_id: number,
    seat_index: number,
    createdAt: string,
    gameId: number,
    max_combo: number,
}

/** @typedef {0|1|2|3|4|5|6|7} GamePlayerSeatIndex */
export type GamePlayerSeatIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7