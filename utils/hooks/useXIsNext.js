import { useContext } from 'react';
import GameStateContext from '../../contexts/GameStateContext';

export default function useXIsNext() {
    const { xIsNext } = useContext(GameStateContext);

    return xIsNext;
}
