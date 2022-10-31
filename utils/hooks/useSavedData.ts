import { useContext } from 'react';
import SavedGameStateContext from '../../contexts/SavedGameStateContext';

export default function useSavedData() {
    const { savedData } = useContext(SavedGameStateContext);

    return savedData;
}
