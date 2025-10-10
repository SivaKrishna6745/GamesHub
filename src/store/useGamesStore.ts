import { create } from 'zustand';

interface Store {
    activePlatform: string;
    setActivePlatform: (platform: string) => void;
}

const useGamesStore = create<Store>((set) => ({
    activePlatform: '',
    setActivePlatform: (platform) => set({ activePlatform: platform }),
}));

export default useGamesStore;
