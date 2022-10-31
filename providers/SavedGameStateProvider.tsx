import { useState } from 'react';
import SavedGameStateContext from '../contexts/SavedGameStateContext';
import { GameData } from '../types/game';

const SavedGameStateProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const initialSavedData: GameData = {
        stepNumber: 0,
        xIsNext: false,
        history: [],
    };

    const [savedData, setSavedData] = useState<GameData>(initialSavedData);

    const saveGame = (game: GameData) => {
        setSavedData(game);
    };

    return (
        <SavedGameStateContext.Provider value={{ savedData, saveGame }}>
            {children}
        </SavedGameStateContext.Provider>
    );
};

export default SavedGameStateProvider;
