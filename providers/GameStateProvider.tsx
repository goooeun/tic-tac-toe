import { useState, useCallback } from 'react';
import GameStateContext from '../contexts/GameStateContext';
import calculateWinner from '../utils/calculateWinner';
import { GameData, SquaresType } from '../types/game';

const GameStateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [history, setHistory] = useState<SquaresType[]>([
        {
            squares: Array(9).fill(null),
        },
    ]);

    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const initialSavedData = {
        history,
        stepNumber,
        xIsNext,
    };
    const [savedData, setSavedData] = useState<GameData>(initialSavedData);

    const clickSquare = useCallback(
        (index: number) => {
            const newHistory = history.slice(0, stepNumber + 1);
            const current = newHistory[newHistory.length - 1];
            const squares = current.squares.slice();

            if (calculateWinner(squares) || squares[index]) {
                return;
            }
            squares[index] = xIsNext ? 'X' : 'O';

            setHistory([...newHistory, { squares }]);
            setStepNumber(newHistory.length);
            setXIsNext(!xIsNext);
        },
        [history, stepNumber, xIsNext]
    );

    const changeStage = (step: number) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const saveLoadGameData = (game: GameData) => {
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
                saveLoadGameData,
            }}
        >
            {children}
        </GameStateContext.Provider>
    );
};

export default GameStateProvider;
