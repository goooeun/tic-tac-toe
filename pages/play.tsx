import axios from 'axios';
import type { NextPage } from 'next';
import Game from '../components/Game';
import { GameStateProvider } from '../contexts/GameStateContext';
import { GameData } from '../types/game';

type Props = {
    game: GameData;
};

const Play: NextPage<Props> = ({ game }) => {
    return (
        <GameStateProvider>
            <Game savedGame={game} />
        </GameStateProvider>
    );
};

export const getStaticProps = async () => {
    const response = await axios.get('http://localhost:3000/api/game');
    const game: GameData = response.data;

    if (response.status == 200) {
        return {
            props: { game },
        };
    }
};

export default Play;
