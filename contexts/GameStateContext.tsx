import { createContext, useState, useCallback } from 'react';
import { GameData, SquaresType } from '../types/game';
import calculateWinner from '../utils/calculateWinner';

type IGameStateContext = {
    history: SquaresType[];
    stepNumber: number;
    xIsNext: boolean;
    clickSquare: (index: number) => void;
    changeStage: (step: number) => void;
    loadGame: (game: GameData) => void;
};

const GameStateContext = createContext<IGameStateContext>({
    history: [],
    stepNumber: 0,
    xIsNext: true,
    clickSquare: () => {},
    changeStage: () => {},
    loadGame: () => {},
});

const GameStateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [history, setHistory] = useState<SquaresType[]>([
        {
            squares: Array(9).fill(null),
            location: 0,
        },
    ]);

    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const clickSquare = useCallback(
        (index: number) => {
            const newHistory = history.slice(0, stepNumber + 1);
            const current = newHistory[newHistory.length - 1];
            const squares = current.squares.slice();

            if (calculateWinner(squares) || squares[index]) {
                return;
            }
            squares[index] = xIsNext ? 'X' : 'O';

            setHistory([...newHistory, { squares, location: index }]);
            setStepNumber(newHistory.length);
            setXIsNext(!xIsNext);
        },
        [history, stepNumber, xIsNext]
    );

    const changeStage = (step: number) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const loadGame = (game: GameData) => {
        setHistory(game.history);
        changeStage(game.stepNumber);
    };

    return (
        <GameStateContext.Provider
            value={{
                history,
                stepNumber,
                xIsNext,
                clickSquare,
                changeStage,
                loadGame,
            }}
        >
            {children}
        </GameStateContext.Provider>
    );
};

export { GameStateContext, GameStateProvider };
