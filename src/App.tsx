import { useEffect, useState } from 'react';
import './App.css';
import { Image } from './components/Image';
import { SearchBar } from './components/SearchBar';
import { Switch } from './components/Switch';
import { gamesPlatforms, gamesGenres } from './api/gamesApi';
import SideNav from './components/SideNav';
import type { gameGenre, gamePlatform } from './types';
import CustomSelectbox from './components/CustomSelectbox';

function App() {
    const [isDark, setIsDark] = useState(false);
    const [gameGenres, setGameGenres] = useState<gameGenre[]>([]);
    const [gamePlatforms, setGamePlatforms] = useState<gamePlatform[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
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

    useEffect(() => {
        getGenres();
        getPlatforms();
    }, []);

    if (errorMessage) return <div>Error while Fetching Data</div>;

    return (
        <div className="flex flex-col gap-8">
            <header className="flex items-center justify-between gap-4">
                <Image src="/src/assets/app-logo.jpg" height={50} width={50} className="rounded-lg" />
                <SearchBar />
                <Switch id="light-dark" label="Dark Mode" onToggle={toggleDarkMode} toggled={isDark} />
            </header>
            <main className="flex">
                <SideNav
                    items={gameGenres?.map((g) => ({ id: g.id, name: g.name, src: g.image_background }))}
                    heading={'Genres'}
                />
                <div className="flex flex-col gap-8">
                    <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200">Games</h2>
                    <CustomSelectbox
                        options={gamePlatforms.map((p) => ({ id: p.id, name: p.name }))}
                        head={'Platforms'}
                    />
                </div>
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
