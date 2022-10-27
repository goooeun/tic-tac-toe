/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import router from 'next/router';
import axios from 'axios';

import useHistory from '../utils/hooks/useHistory';
import useStepNumber from '../utils/hooks/useStepNumber';
import useXIsNext from '../utils/hooks/useXIsNext';
import useActions from '../utils/hooks/useActions';
import calculateWinner from '../utils/calculateWinner';

import Board from './Board';
import SavedGameListPopup from './SavedGameListPopup';

import { MdSave, MdDownload, MdHome } from 'react-icons/md';
import Link from 'next/link';

function Game() {
    const history = useHistory();
    const stepNumber = useStepNumber();
    const xIsNext = useXIsNext();

    const { changeStage } = useActions();

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
        ? 'Congratulations🎉 Winner is ' + winner
        : 'Next player: ' + (xIsNext ? 'X' : 'O');

    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        setIsOpen(true);
    };
    const closePopup = () => {
        setIsOpen(false);
    };

    const saveGame = () => {
        if (confirm('Do you want to save the game?')) {
            console.log('game save!');
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
                <button onClick={openPopup}>
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
            {isOpen && <SavedGameListPopup closePopup={closePopup} />}
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

interface GameData {
    id: number;
    stepNumber: number;
    xIsNext: boolean;
    data: (string | null)[];
    date: Date;
}

export const getServerSideProps = async () => {
    const response = await axios.get('http://localhost:3000/api/list');
    const gameData = response.data;
    return {
        props: { gameData },
    };
};

export default Game;
