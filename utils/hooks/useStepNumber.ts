import { useContext } from 'react';
import GameStateContext from '../../contexts/GameStateContext';

export default function useStepNumber() {
    const { stepNumber } = useContext(GameStateContext);

    return stepNumber;
}
