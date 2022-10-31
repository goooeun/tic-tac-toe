import { useContext } from 'react';
import SavedGameStateContext from '../../contexts/SavedGameStateContext';

export default function useSavedDataActions() {
    const { saveGame } = useContext(SavedGameStateContext);

    return { saveGame };
}
