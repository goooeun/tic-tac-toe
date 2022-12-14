import type { NextApiRequest, NextApiResponse } from 'next';
import gameData from '../../json/savedGame.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(gameData.game);
}
