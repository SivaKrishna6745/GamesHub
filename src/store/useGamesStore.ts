import { create } from 'zustand';
import type { gameGenre, gamePlatform, gameRes } from '../types';

interface Store {
    activeGenre: string;
    activePlatform: string;
    errorMessage: string;
    gamesGenres: gameGenre[];
    gamesList: gameRes[];
    gamesPlatforms: gamePlatform[];
    isDark: boolean;
    isLoading: boolean;
    setActiveGenre: (genre: string) => void;
    setActivePlatform: (platform: string) => void;
    setErrorMessage: (error: string) => void;
    setGamesGenres: (genres: gameGenre[]) => void;
    setGamesList: (games: gameRes[]) => void;
    setGamesPlatforms: (platforms: gamePlatform[]) => void;
    setIsDark: (value: boolean) => void;
    setIsLoading: (loading: boolean) => void;
}

const useGamesStore = create<Store>((set) => ({
    activePlatform: '',
    activeGenre: '',
    errorMessage: '',
    gamesGenres: [],
    gamesList: [],
    gamesPlatforms: [],
    isDark: false,
    isLoading: false,
    setActiveGenre: (genre: string) => set({ activeGenre: genre }),
    setActivePlatform: (platform: string) => set({ activePlatform: platform }),
    setErrorMessage: (error: string) => set({ errorMessage: error }),
    setGamesGenres: (genres: gameGenre[]) => set({ gamesGenres: genres }),
    setGamesList: (games: gameRes[]) => set({ gamesList: games }),
    setGamesPlatforms: (platforms: gamePlatform[]) => set({ gamesPlatforms: platforms }),
    setIsDark: (isDark: boolean) => set({ isDark: isDark }),
    setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));

export default useGamesStore;
