import type { NextPage } from 'next';
import Game from '../components/Game';
import GameStateProvider from '../providers/GameStateProvider';

const Play: NextPage = () => {
    return (
        <GameStateProvider>
            <Game />
        </GameStateProvider>
    );
};

export default Play;
