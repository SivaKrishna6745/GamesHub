import { create } from 'zustand';
import type { gameGenre, gamePlatform, gameRes } from '../types';

interface Store {
    isDark: boolean;
    activePlatform: string;
    activeGenre: string;
    errorMessage: string;
    gamesGenres: gameGenre[];
    gamesPlatforms: gamePlatform[];
    gamesList: gameRes[];
    setIsDark: (value: boolean) => void;
    setActivePlatform: (platform: string) => void;
    setActiveGenre: (genre: string) => void;
    setErrorMessage: (error: string) => void;
    setGamesGenres: (genres: gameGenre[]) => void;
    setGamesPlatforms: (platforms: gamePlatform[]) => void;
    setGamesList: (games: gameRes[]) => void;
}

const useGamesStore = create<Store>((set) => ({
    isDark: false,
    activePlatform: '',
    activeGenre: '',
    errorMessage: '',
    gamesGenres: [],
    gamesPlatforms: [],
    gamesList: [],
    setIsDark: (isDark: boolean) => set({ isDark: isDark }),
    setActivePlatform: (platform: string) => set({ activePlatform: platform }),
    setActiveGenre: (genre: string) => set({ activeGenre: genre }),
    setErrorMessage: (error: string) => set({ errorMessage: error }),
    setGamesGenres: (genres: gameGenre[]) => set({ gamesGenres: genres }),
    setGamesPlatforms: (platforms: gamePlatform[]) => set({ gamesPlatforms: platforms }),
    setGamesList: (games: gameRes[]) => set({ gamesList: games }),
}));

export default useGamesStore;
