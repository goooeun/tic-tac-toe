import styled from '@emotion/styled';
import Square from './Square';

type BoardProps = {
    squares: (string | null)[];
};

const Board = ({ squares }: BoardProps) => {
    const renderSquare = (index: number) => {
        return <Square index={index} value={squares[index]} />;
    };

    return (
        <div>
            <BoardRow>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </BoardRow>
            <BoardRow>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </BoardRow>
            <BoardRow>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </BoardRow>
        </div>
    );
};

const BoardRow = styled.div`
    &:after {
        clear: both;
        content: '';
        display: table;
    }
`;

export default Board;
