import { create } from 'zustand';
import type { GameGenre, GamePlatform, GameRes } from '../types';
import { persist } from 'zustand/middleware';

interface Store {
    activeGenre: string;
    activePlatform: string;
    errorMessage: string;
    gamesGenres: GameGenre[];
    gamesList: GameRes[];
    gamesPlatforms: GamePlatform[];
    isDark: boolean;
    isLoading: boolean;
    setActiveGenre: (genre: string) => void;
    setActivePlatform: (platform: string) => void;
    setErrorMessage: (error: string) => void;
    setGamesGenres: (genres: GameGenre[]) => void;
    setGamesList: (games: GameRes[]) => void;
    setGamesPlatforms: (platforms: GamePlatform[]) => void;
    setIsDark: (value: boolean) => void;
    setIsLoading: (loading: boolean) => void;
}

const useGamesStore = create<Store>()(
    persist(
        (set) => ({
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
            setGamesGenres: (genres: GameGenre[]) => set({ gamesGenres: genres }),
            setGamesList: (games: GameRes[]) => set({ gamesList: games }),
            setGamesPlatforms: (platforms: GamePlatform[]) => set({ gamesPlatforms: platforms }),
            setIsDark: (isDark: boolean) => set({ isDark: isDark }),
            setIsLoading: (loading: boolean) => set({ isLoading: loading }),
        }),
        { name: 'games-store', partialize: (state) => ({ isDark: state.isDark }) }
    )
);

export default useGamesStore;
