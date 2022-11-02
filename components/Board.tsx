import styled from '@emotion/styled';
import Square from './Square';

type BoardProps = {
    squares: (string | null)[];
};

const Board = ({ squares }: BoardProps) => {
    const renderSquare = (index: number) => {
        return <Square key={index} index={index} value={squares[index]} />;
    };

    const boardRows = () => {
        let rows = [];
        let squareIndex = 0;
        for (let i = 0; i < 3; i++) {
            let squares = [];
            for (let j = 0; j < 3; j++) {
                squares.push(renderSquare(squareIndex));
                squareIndex++;
            }
            rows.push(<BoardRow key={i}>{squares}</BoardRow>);
        }

        return rows;
    };

    return <div>{boardRows()}</div>;
};

const BoardRow = styled.div`
    &:after {
        clear: both;
        content: '';
        display: table;
    }
`;

export default Board;
