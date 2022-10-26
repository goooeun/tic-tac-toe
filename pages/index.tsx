import type { NextPage } from 'next';
import Game from '../components/Game';
import GameStateProvider from '../providers/GameStateProvider';

const Home: NextPage = () => {
    return (
        <GameStateProvider>
            <Game />
        </GameStateProvider>
    );
};

export default Home;
