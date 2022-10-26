import { useContext } from 'react';
import GameStateContext from '../../contexts/GameStateContext';

export default function useActions() {
    const { clickSquare, changeStage } = useContext(GameStateContext);

    return { clickSquare, changeStage };
}
