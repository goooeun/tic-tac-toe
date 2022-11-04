import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { GameData } from '../types/game';
import useSavedData from '../utils/hooks/useSavedData';
import axios from 'axios';

type Props = {
    data: GameData;
};

const Load: NextPage<Props> = ({ data }) => {
    const savedGameData = useSavedData();
    const [gameData, setGameData] = useState<GameData>(savedGameData);

    useEffect(() => {
        if (gameData.stepNumber == 0) {
            setGameData(data);
        }
    }, [data, gameData]);

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

export const getServerSideProps = async () => {
    const response = await axios.get('http://localhost:3000/api/game');
    const game: GameData = response.data;

    if (response.status == 200) {
        return {
            props: { data: game },
        };
    }
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

export default Load;
