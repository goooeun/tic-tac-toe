import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MdClose } from 'react-icons/md';

type Props = {
    closePopup: () => void;
};

const SavedGameListPopup: React.FC<Props> = ({ closePopup }) => {
    const [gameList, setGameList] = useState<[] | SavedGame[]>([]);

    const loadGame = () => {};

    return (
        <PopupLayout>
            <PopupView>
                <PopupHead>
                    <PopupTitle>SAVE LIST</PopupTitle>
                    <CloseButton onClick={closePopup}>
                        <MdClose />
                    </CloseButton>
                </PopupHead>
                <PopupBody>
                    <ul
                        css={css`
                            padding-left: 0;
                        `}
                    >
                        {gameList.length > 0 ? (
                            gameList.map((game: SavedGame) => (
                                <ListItem
                                    key={game.id}
                                    onClick={() => loadGame}
                                >
                                    <div>Round : {game.stepNumber}</div>
                                    <div>
                                        Next Player : {game.xIsNext ? 'X' : 'O'}
                                    </div>
                                    <div>Saved Time : {game.date}</div>
                                </ListItem>
                            ))
                        ) : (
                            <div
                                css={css`
                                    text-align: center;
                                `}
                            >
                                No data
                            </div>
                        )}
                    </ul>
                </PopupBody>
            </PopupView>
        </PopupLayout>
    );
};

interface SavedGame {
    id: number;
    stepNumber: number;
    xIsNext: boolean;
    data: (string | null)[];
    date: string;
}

const PopupLayout = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
`;

const PopupView = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 300px;
    margin: 150px auto;
    padding: 20px 16px;
    border-radius: 4px;
    position: relative;
`;

const PopupHead = styled.div`
    display: flex;
    justify-content: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 14px;
    right: 16px;
    background-color: #fff;
    color: #000;
    border: none;
    font-size: 1.5rem;
    padding: 0;
    cursor: pointer;
    &:hover {
        background-color: #fff;
        color: #888;
    }
`;

const PopupBody = styled.div`
    padding: 16px 0;
`;

const PopupTitle = styled.div`
    font-size: 1.2em;
    font-weight: 700;
`;

const ListItem = styled.li`
    list-style: none;
    margin: 8px 0;
    padding: 8px;
    border: 1px solid #888;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    &:hover {
        background-color: #e5e5e5;
        color: #333;
    }
    cursor: pointer;
`;

export default SavedGameListPopup;
