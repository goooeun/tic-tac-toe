export interface GameData {
    stepNumber: number;
    xIsNext: boolean;
    history: SquaresType[];
}

export interface SquaresType {
    squares: (string | null)[];
    location: number;
}
