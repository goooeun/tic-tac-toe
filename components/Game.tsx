/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useHistory from '../utils/hooks/useHistory';
import useStepNumber from '../utils/hooks/useStepNumber';
import useXIsNext from '../utils/hooks/useXIsNext';
import useActions from '../utils/hooks/useActions';
import calculateWinner from '../utils/calculateWinner';
import Board from './Board';

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
            <li key={move}>
                <button onClick={clickMove}>{desc}</button>
            </li>
        );
    });

    const status = winner
        ? 'Winner: ' + winner
        : 'Next player: ' + (xIsNext ? 'X' : 'O');

    return (
        <div
            css={css`
                display: flex;
                flex-direction: row;
            `}
        >
            <div
                css={css`
                    margin-left: 20px;
                `}
            >
                <Board squares={current.squares} />
            </div>
            <div
                css={css`
                    margin-left: 20px;
                `}
            >
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;
