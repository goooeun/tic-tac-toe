import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Link from 'next/link';
import Game from '../components/Game';
import GameStateProvider from '../providers/GameStateProvider';

const Home: NextPage = () => {
    return (
        <HomeLayout>
            <h2>Let&apos;s play</h2>
            <h1>TIC TAC TOE</h1>
            <ButtonGroup>
                <Link href="/play">
                    <a className="button">START</a>
                </Link>
                <Link href="/load">
                    <a className="button">LOAD</a>
                </Link>
            </ButtonGroup>
        </HomeLayout>
    );
};

const HomeLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 170px;
    .button:first-child {
        margin-bottom: 8px;
    }
`;

export default Home;
