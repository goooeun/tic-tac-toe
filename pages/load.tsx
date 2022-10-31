import { NextPage } from 'next';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Props = {
    list: SavedGame[];
};

const Load: NextPage<Props> = ({ list }) => {
    const [gameList, setGameList] = useState(list);

    const loadGame = () => {};

    return (
        <div>
            <h1>SAVED GAMES</h1>
            <div
                css={css`
                    padding-bottom: 8px;
                `}
            >
                {gameList.map((game: SavedGame) => (
                    <ListItem key={game.id} onClick={() => loadGame}>
                        <div>Round : {game.stepNumber}</div>
                        <div>Next Player : {game.xIsNext ? 'X' : 'O'}</div>
                        <div>Saved Time : {game.date}</div>
                    </ListItem>
                ))}
            </div>
            <Link href="/">
                <a className="button">HOME</a>
            </Link>
        </div>
    );
};

const ListItem = styled.div`
    list-style: none;
    margin: 8px 0;
    padding: 8px;
    border: 1px solid #888;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    &:hover {
        background-color: #e5e5e5;
        color: #333;
    }
    cursor: pointer;
`;

interface SavedGame {
    id: number;
    stepNumber: number;
    xIsNext: boolean;
    data: (string | null)[];
    date: Date;
}

export const getServerSideProps = async () => {
    const response = await axios.get('http://localhost:3000/api/list');
    const list: SavedGame[] = response.data;
    return {
        props: { list },
    };
};

export default Load;
