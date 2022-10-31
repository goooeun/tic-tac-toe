import { useContext } from 'react';
import GameStateContext from '../../contexts/GameStateContext';

export default function useHistory() {
    const { history } = useContext(GameStateContext);

    return history;
}
