import { type gameGenre, type gamePlatform } from '../types';

const API_KEY = import.meta.env.VITE_GAMES_API_KEY;

export const gamesGenres = async (): Promise<gameGenre[]> => {
    const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
};

export const gamesPlatforms = async (): Promise<gamePlatform[]> => {
    const response = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.results);
    return data.results;
};
