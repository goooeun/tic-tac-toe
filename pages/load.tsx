import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { GameData } from '../types/game';

type Props = {
    data: GameData;
};

const Load: NextPage<Props> = ({ data }) => {
    const [gameData, setGameData] = useState(data);

    const loadGame = () => {
        Router.push('/play?load=true');
    };

    return (
        <LoadLayout>
            <h1>SAVED GAME</h1>
            <div
                css={css`
                    padding-bottom: 8px;
                `}
            >
                {gameData ? (
                    <ListItem onClick={loadGame}>
                        <div>Round : {gameData.stepNumber}</div>
                        <div>Next Player : {gameData.xIsNext ? 'X' : 'O'}</div>
                    </ListItem>
                ) : (
                    <div
                        css={css`
                            margin: 16px 0;
                        `}
                    >
                        No data
                    </div>
                )}
            </div>
            <Link href="/">
                <a
                    className="button"
                    css={css`
                        width: 170px;
                    `}
                >
                    HOME
                </a>
            </Link>
        </LoadLayout>
    );
};

const LoadLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ListItem = styled.div`
    width: 170px;
    list-style: none;
    margin: 8px 0;
    padding: 8px 10px;
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

export const getServerSideProps = async () => {
    const response = await axios.get('http://localhost:3000/api/game');
    const game: GameData = response.data;

    if (response.status == 200) {
        return {
            props: { data: game },
        };
    }
};

export default Load;
