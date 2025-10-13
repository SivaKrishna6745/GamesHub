import { create } from 'zustand';

interface Store {
    activePlatform: string;
    activeGenre: string;
    setActivePlatform: (platform: string) => void;
    setActiveGenre: (genre: string) => void;
}

const useGamesStore = create<Store>((set) => ({
    activePlatform: '',
    activeGenre: '',
    setActivePlatform: (platform) => set({ activePlatform: platform }),
    setActiveGenre: (genre) => set({ activeGenre: genre }),
}));

export default useGamesStore;
