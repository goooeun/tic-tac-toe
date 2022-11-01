/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useGameState, useSavedGameState } from '../utils/hooks/useGameState';
import {
    useGameStateActions,
    useSavedDataActions,
} from '../utils/hooks/useActions';
import calculateWinner from '../utils/calculateWinner';

import Board from './Board';
import { GameData, SquaresType } from '../types/game';

import { MdSave, MdDownload, MdHome } from 'react-icons/md';

type Props = {
    savedGame: GameData;
};

function Game({ savedGame }: Props) {
    const { changeStage, loadGame } = useGameStateActions();
    const { saveGame } = useSavedDataActions();
    const { savedData } = useSavedGameState();

    const router = useRouter();
    const { load } = router.query;

    const [gameData, setGameData] = useState<GameData>(
        savedData.stepNumber === 0 ? savedGame : savedData
    );

    useEffect(() => {
        if (!load) return;
        loadGame(gameData);
    }, [load]);

    const { history, stepNumber, xIsNext } = useGameState();
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step: SquaresType, move: number) => {
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

    const [save, setSave] = useState(false);

    const clickSaveGame = () => {
        if (confirm('Do you want to save the game?')) {
            setSave(true);
            const saveData: GameData = {
                history,
                stepNumber,
                xIsNext,
            };
            saveGame(saveData);
        }
    };
    const clickLoadGame = () => {
        if (confirm('Do you want to load the game?')) {
            loadGame(gameData);
        }
    };

    const handleBackButton = () => {
        if (!save) {
            if (confirm('The game is not saved. Are you really going home?')) {
                router.push('/');
            }
        } else {
            router.push('/');
        }
    };

    return (
        <GameLayout>
            <ButtonGroup>
                <button
                    onClick={clickSaveGame}
                    disabled={stepNumber == 0 ? true : false}
                >
                    <MdSave />
                    SAVE
                </button>
                <button onClick={clickLoadGame}>
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
