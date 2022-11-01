import { createContext, useState } from 'react';
import { GameData } from '../types/game';

type ISavedGameStateContext = {
    savedData: GameData;
    saveGame: (game: GameData) => void;
};

const initialSavedData: GameData = {
    stepNumber: 0,
    xIsNext: false,
    history: [],
};

const SavedGameStateContext = createContext<ISavedGameStateContext>({
    savedData: initialSavedData,
    saveGame: () => {},
});

const SavedGameStateProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
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

export { SavedGameStateContext, SavedGameStateProvider };
