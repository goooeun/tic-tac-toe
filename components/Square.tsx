import styled from '@emotion/styled';
import useActions from '../utils/hooks/useActions';

type SquareProps = {
    index: number;
    value: string | null;
};

const SquareButton = styled.button`
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 34px;
    &:focus {
        outline: none;
        background: #ddd;
    }
`;

const Square = ({ index, value }: SquareProps) => {
    const { clickSquare } = useActions();
    const click = () => {
        clickSquare(index);
    };
    return <SquareButton onClick={click}>{value}</SquareButton>;
};

export default Square;
