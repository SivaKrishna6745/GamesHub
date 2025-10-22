import { type GameGenre, type GamePlatform, type GameRes } from '../types';

const API_KEY = import.meta.env.VITE_GAMES_API_KEY;

export const getGamesGenres = async (): Promise<GameGenre[]> => {
    const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
};

export const getGamesPlatforms = async (): Promise<GamePlatform[]> => {
    const response = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
};

export const getGames = async (): Promise<GameRes[]> => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
};

export const loadMoreGames = async (page?: number): Promise<GameRes[]> => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=40`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
};
