export interface GameData {
    stepNumber: number;
    xIsNext: boolean;
    history: SquaresType[];
    date: string | null;
}

export interface SquaresType {
    squares: (string | null)[];
}
