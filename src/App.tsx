import { useEffect, useMemo } from 'react';
import './App.css';
import { Image } from './components/Image';
import { SearchBar } from './components/SearchBar';
import { Switch } from './components/Switch';
import { getGamesPlatforms, getGamesGenres, getGames } from './api/gamesApi';
import SideNav from './components/SideNav';
import CustomSelectbox from './components/CustomSelectbox';
import useGamesStore from './store/useGamesStore';
import { Card } from './components/Card';
import { fetchData, retry, filter } from './utils/utils';

function App() {
    const activeGenre = useGamesStore((state) => state.activeGenre);
    const activePlatform = useGamesStore((state) => state.activePlatform);
    const errorMessage = useGamesStore((state) => state.errorMessage);
    const gamesGenres = useGamesStore((state) => state.gamesGenres);
    const gamesList = useGamesStore((state) => state.gamesList);
    const gamesPlatforms = useGamesStore((state) => state.gamesPlatforms);
    const isDark = useGamesStore((state) => state.isDark);
    const isLoading = useGamesStore((state) => state.isLoading);
    const setActivePlatform = useGamesStore((state) => state.setActivePlatform);
    const setErrorMessage = useGamesStore((state) => state.setErrorMessage);
    const setGamesGenres = useGamesStore((state) => state.setGamesGenres);
    const setGamesList = useGamesStore((state) => state.setGamesList);
    const setGamesPlatforms = useGamesStore((state) => state.setGamesPlatforms);
    const setIsDark = useGamesStore((state) => state.setIsDark);
    const setIsLoading = useGamesStore((state) => state.setIsLoading);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([
                    fetchData(() => retry(getGamesGenres), setGamesGenres, setErrorMessage),
                    fetchData(() => retry(getGamesPlatforms), setGamesPlatforms, setErrorMessage),
                    fetchData(() => retry(getGames), setGamesList, setErrorMessage),
                ]);
            } catch (error) {
                console.log(`Error while fetching data: ${error}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const filteredGamesList = useMemo(() => {
        return gamesList.filter(
            (game) => filter(game, activeGenre, 'genre') && filter(game, activePlatform, 'platform')
        );
    }, [activeGenre, activePlatform, gamesList]);

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
            <main className="grid gap-16 grid-flow-col place-items-start">
                <SideNav
                    items={gamesGenres?.map((g) => ({ id: g.id, name: g.name, src: g.image_background }))}
                    heading={'Genres'}
                    className="w-max"
                />
                <div className="flex flex-col items-start gap-4">
                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                        {activePlatform + ' Games' || 'Games'}
                    </h2>
                    <CustomSelectbox
                        options={gamesPlatforms.map((p) => ({ id: p.id, name: p.name }))}
                        head={activePlatform || 'Platforms'}
                        onSelect={handleSelect}
                    />
                    {isLoading ? (
                        <p className="text-gray-800 dark:text-gray-200">Loading data, please wait..!</p>
                    ) : filteredGamesList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredGamesList.map((game) => (
                                <Card
                                    key={game.id}
                                    name={game.name}
                                    bgSrc={game.background_image}
                                    rating={game.rating}
                                    platforms={game.platforms}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="my-10 text-gray-800 dark:text-gray-200 text-2xl">No Games Available!!</p>
                    )}
                </div>
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
