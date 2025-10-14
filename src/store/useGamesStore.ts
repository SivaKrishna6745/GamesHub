import { create } from 'zustand';

interface Store {
    isDark: boolean;
    activePlatform: string;
    activeGenre: string;
    setIsDark: (value: boolean) => void;
    setActivePlatform: (platform: string) => void;
    setActiveGenre: (genre: string) => void;
}

const useGamesStore = create<Store>((set) => ({
    isDark: false,
    activePlatform: '',
    activeGenre: '',
    setIsDark: (isDark) => set({ isDark: isDark }),
    setActivePlatform: (platform) => set({ activePlatform: platform }),
    setActiveGenre: (genre) => set({ activeGenre: genre }),
}));

export default useGamesStore;
