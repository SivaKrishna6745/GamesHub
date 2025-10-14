import { type gameGenre, type gamePlatform, type gameRes } from '../types';

const API_KEY = import.meta.env.VITE_GAMES_API_KEY;

export const getGamesGenres = async (): Promise<gameGenre[]> => {
    const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
};

export const getGamesPlatforms = async (): Promise<gamePlatform[]> => {
    const response = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
};

export const getGames = async (): Promise<gameRes[]> => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
};
