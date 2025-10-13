import { useEffect, useState } from 'react';
import './App.css';
import { Image } from './components/Image';
import { SearchBar } from './components/SearchBar';
import { Switch } from './components/Switch';
import { gamesPlatforms, gamesGenres, games } from './api/gamesApi';
import SideNav from './components/SideNav';
import type { gameGenre, gamePlatform, gameRes } from './types';
import CustomSelectbox from './components/CustomSelectbox';
import useGamesStore from './store/useGamesStore';
import { Card } from './components/Card';

function App() {
    const [isDark, setIsDark] = useState(false);
    const [gameGenres, setGameGenres] = useState<gameGenre[]>([]);
    const [gamePlatforms, setGamePlatforms] = useState<gamePlatform[]>([]);
    const [gamesList, setGamesList] = useState<gameRes[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { activePlatform, setActivePlatform } = useGamesStore();

    const toggleDarkMode = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const getGenres = async () => {
        try {
            const data = await gamesGenres();
            setGameGenres(data);
        } catch (error) {
            console.error(error);
            setErrorMessage(`Failed to load data: ${error}`);
        }
    };

    const getPlatforms = async () => {
        try {
            const data = await gamesPlatforms();
            setGamePlatforms(data);
        } catch (error) {
            console.error(error);
            setErrorMessage(`Failed to load data: ${error}`);
        }
    };
    const getGames = async () => {
        try {
            const data = await games();
            setGamesList(data);
        } catch (error) {
            console.error(error);
            setErrorMessage(`Failed to load data: ${error}`);
        }
    };

    useEffect(() => {
        getGenres();
        getPlatforms();
        getGames();
    }, []);

    const handleSelect = (option: string) => {
        setActivePlatform(option);
    };

    if (errorMessage) return <div>Error while Fetching Data</div>;

    return (
        <div className="flex flex-col gap-8">
            <header className="flex items-center justify-between gap-4">
                <Image src="/src/assets/app-logo.jpg" height={50} width={50} className="rounded-lg" />
                <SearchBar />
                <Switch id="light-dark" label="Dark Mode" onToggle={toggleDarkMode} toggled={isDark} />
            </header>
            <main className="grid gap-4 grid-flow-col grid-cols-[1fr,3fr] place-items-start">
                <SideNav
                    items={gameGenres?.map((g) => ({ id: g.id, name: g.name, src: g.image_background }))}
                    heading={'Genres'}
                />
                <div className="flex flex-col items-start gap-8">
                    <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200">
                        {activePlatform + ' Games' || 'Games'}
                    </h2>
                    <CustomSelectbox
                        options={gamePlatforms.map((p) => ({ id: p.id, name: p.name }))}
                        head={activePlatform || 'Platforms'}
                        onSelect={handleSelect}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {gamesList.map((g) => (
                            <Card name={g.name} bgSrc={g.background_image} rating={g.rating} />
                        ))}
                    </div>
                </div>
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
