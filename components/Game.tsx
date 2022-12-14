/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
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
import { TbSortAscending2, TbSortDescending2 } from 'react-icons/tb';

type Props = {
    savedGame: GameData;
};

function Game({ savedGame }: Props) {
    const { changeStage, loadGame } = useGameStateActions();
    const { saveGame } = useSavedDataActions();
    const { savedData } = useSavedGameState();

    const activeHistory = useRef(-1);

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
    const gameResult = calculateWinner(current.squares);
    const [sort, setSort] = useState('asc');

    const moves = history.map((step: SquaresType, move: number) => {
        if (sort === 'desc') {
            move = history.length - 1 - move;
        }
        const location = step.location;
        const col = (location % 3) + 1;
        const row = Math.floor(location / 3) + 1;

        const desc = move
            ? `Go to move #${move} (${col}, ${row})`
            : 'Go to game start';

        const isActive = activeHistory.current === move ? true : false;

        const clickMove = () => {
            activeHistory.current = move;
            changeStage(move);
        };

        return (
            <Button
                key={move}
                onClick={clickMove}
                className={isActive ? 'active' : ''}
            >
                {desc}
            </Button>
        );
    });

    const nextPlayerMessage =
        stepNumber === 9 ? 'Draw' : 'Next player: ' + (xIsNext ? 'X' : 'O');

    const status = gameResult
        ? 'Congratulations????  Winner is ' + gameResult.square
        : nextPlayerMessage;

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

    const handleSort = () => {
        setSort(sort === 'desc' ? 'asc' : 'desc');
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
            <Board gameResult={gameResult} squares={current.squares} />
            <TitleBox>
                <h3>Move History</h3>
                <button onClick={handleSort}>
                    {sort === 'desc' ? (
                        <TbSortDescending2 />
                    ) : (
                        <TbSortAscending2 />
                    )}
                </button>
            </TitleBox>
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

const Button = styled.button`
    width: 256px;
    &.active {
        background-color: #fff;
        color: #333;
        border: 2px solid #333;
        font-weight: bold;
        &:hover {
            background-color: #ddd;
        }
    }
`;

const TitleBox = styled.div`
    border-top: 1px solid #ddd;
    width: 256px;
    padding: 20px 0 0;
    text-align: center;
    position: relative;
    button {
        position: absolute;
        top: 30px;
        right: 0;
        font-size: 1.2em;
        padding: 6px;
    }
`;

export default Game;
