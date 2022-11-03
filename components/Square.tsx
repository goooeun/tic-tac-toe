import styled from '@emotion/styled';
import { useGameStateActions } from '../utils/hooks/useActions';

type SquareProps = {
    index: number;
    value: string | null;
    className: string;
};

const Square = ({ index, value, className }: SquareProps) => {
    const { clickSquare } = useGameStateActions();
    const click = () => {
        clickSquare(index);
    };
    return (
        <SquareButton className={className} onClick={click}>
            {value}
        </SquareButton>
    );
};

const SquareButton = styled.button`
    background-color: #fff;
    color: #333;
    border: 1px solid #999;
    float: left;
    font-size: 3rem;
    font-weight: bold;
    line-height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 80px;
    height: 80px;
    &.active {
        color: #fff;
        background-color: #64835c;
        &:focus {
            background-color: #64835c;
        }
        &:hover {
            background-color: #2e492e;
        }
    }
    &:hover {
        background-color: #aaa;
    }
    &:focus {
        outline: none;
        background-color: #eee;
    }
    margin-bottom: 8px;
    &:nth-of-type(3n-1) {
        margin-left: 8px;
        margin-right: 8px;
    }
`;

export default Square;
