import { useContext } from 'react';
import { GameStateContext } from '../../contexts/GameStateContext';
import { SavedGameStateContext } from '../../contexts/SavedGameStateContext';

function useGameStateActions() {
    const context = useContext(GameStateContext);

    if (context === undefined) {
        throw new Error('GameStateContext must be used within a Provider');
    }

    return context;
}

function useSavedDataActions() {
    const context = useContext(SavedGameStateContext);

    if (context === undefined) {
        throw new Error('SavedGameStateContext must be used within a Provider');
    }
    return context;
}

export { useGameStateActions, useSavedDataActions };
