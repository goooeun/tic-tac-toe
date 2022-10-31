/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import router from 'next/router';
import axios from 'axios';

import useHistory from '../utils/hooks/useHistory';
import useStepNumber from '../utils/hooks/useStepNumber';
import useXIsNext from '../utils/hooks/useXIsNext';
import useActions from '../utils/hooks/useActions';
import calculateWinner from '../utils/calculateWinner';

import Board from './Board';
import { GameData } from './types';

import { MdSave, MdDownload, MdHome } from 'react-icons/md';

function Game() {
    const [gameData, setGameData] = useState<GameData>();

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/game');
            setGameData(response.data);
        } catch (e) {
            // console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const history = useHistory();
    const stepNumber = useStepNumber();
    const xIsNext = useXIsNext();

    const { changeStage, saveLoadGameData } = useActions();
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step: number, move: number) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        const clickMove = () => {
            changeStage(move);
        };
        return (
            <button key={move} onClick={clickMove}>
                {desc}
            </button>
        );
    });

    const status = winner
        ? 'Congratulations🎉  Winner is ' + winner
        : 'Next player: ' + (xIsNext ? 'X' : 'O');

    const saveGame = () => {
        if (confirm('Do you want to save the game?')) {
            saveLoadGameData({
                history,
                stepNumber,
                xIsNext,
            });
        }
    };
    const loadGame = () => {
        if (confirm('Do you want to load the game?')) {
            saveLoadGameData(gameData);
        }
    };

    const handleBackButton = () => {
        if (confirm('The game is not saved. Are you really going home?')) {
            router.push('/');
        }
    };

    return (
        <GameLayout>
            <ButtonGroup>
                <button onClick={saveGame}>
                    <MdSave />
                    SAVE
                </button>
                <button onClick={loadGame}>
                    <MdDownload />
                    LOAD
                </button>
                <button onClick={handleBackButton}>
                    <MdHome />
                    HOME
                </button>
            </ButtonGroup>
            <div
                css={css`
                    font-size: 1.3em;
                    font-weight: bold;
                `}
            >
                {status}
            </div>
            <Board squares={current.squares} />
            <div
                css={css`
                    display: flex;
                    flex-direction: column;
                `}
            >
                {moves}
            </div>
        </GameLayout>
    );
}

const GameLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
`;

export default Game;
