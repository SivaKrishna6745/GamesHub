import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Image } from './components/Image';
import { SearchBar } from './components/SearchBar';
import { Switch } from './components/Switch';
import { getGamesPlatforms, getGamesGenres, getGames, loadMoreGames } from './api/gamesApi';
import SideNav from './components/SideNav';
import CustomSelectbox from './components/CustomSelectbox';
import useGamesStore from './store/useGamesStore';
import { Card } from './components/Card';
import { fetchData, retry, filter } from './utils/utils';
import { useDeviceFlags } from './hooks/useDeviceFlags';
import useDebounce from './hooks/useDebounce';
import { Shimmer } from './components/Shimmer';
import AppLogo from './assets/app-logo.jpg';
import useIntersectionObserver from './hooks/useIntersectionObserver';

function App() {
    const activeGenre = useGamesStore((state) => state.activeGenre);
    const activePlatform = useGamesStore((state) => state.activePlatform);
    const errorMessage = useGamesStore((state) => state.errorMessage);
    const gamesGenres = useGamesStore((state) => state.gamesGenres);
    const gamesList = useGamesStore((state) => state.gamesList);
    const gamesPlatforms = useGamesStore((state) => state.gamesPlatforms);
    const isDark = useGamesStore((state) => state.isDark);
    const isLoading = useGamesStore((state) => state.isLoading);
    const searchTerm = useGamesStore((state) => state.searchTerm);

    const setActivePlatform = useGamesStore((state) => state.setActivePlatform);
    const setErrorMessage = useGamesStore((state) => state.setErrorMessage);
    const setGamesGenres = useGamesStore((state) => state.setGamesGenres);
    const setGamesList = useGamesStore((state) => state.setGamesList);
    const setGamesPlatforms = useGamesStore((state) => state.setGamesPlatforms);
    const setIsDark = useGamesStore((state) => state.setIsDark);
    const setIsLoading = useGamesStore((state) => state.setIsLoading);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { isMobile, isDesktop } = useDeviceFlags();

    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
    const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    useEffect(() => {
        if (isIntersecting && !isFetchingMore) {
            setIsFetchingMore(true);
            loadMoreGames(page + 1)
                .then((newGames) => {
                    setGamesList([...gamesList, ...newGames]);
                    setPage((prev) => prev + 1);
                })
                .finally(() => setIsFetchingMore(false));
        }
    }, [isIntersecting]);

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

    const searchFilteredGamesList = useMemo(() => {
        if (!debouncedSearchTerm || debouncedSearchTerm.trim() === '') {
            return filteredGamesList;
        }

        return filteredGamesList.filter((game) => game.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }, [debouncedSearchTerm, filteredGamesList]);

    const handleSelect = (option: string) => {
        setActivePlatform(option);
    };

    if (errorMessage) return <div>Error while Fetching Data</div>;

    return (
        <div className="flex flex-col gap-8">
            <header className="flex items-center justify-between gap-4">
                <Image src={AppLogo} height={50} width={50} className="rounded-lg" />
                {isDesktop && <SearchBar />}
                <Switch id="light-dark" label="Dark Mode" onToggle={() => setIsDark(!isDark)} toggled={isDark} />
            </header>
            <main className="relative grid gap-4 md:gap-10 lg:gap-16 grid-flow-row md:grid-flow-col lg:grid-cols-4 place-items-start w-full">
                {isMobile && <SearchBar />}
                {isLoading ? (
                    <Shimmer variant={isMobile ? 'mobile-nav' : 'desktop-nav'} />
                ) : (
                    <SideNav
                        items={gamesGenres?.map((g) => ({ id: g.id, name: g.name, src: g.image_background }))}
                        heading={'Genres'}
                        className="hidden md:block w-max"
                        mobileNav={isMobile}
                    />
                )}
                <div className="flex flex-col items-start gap-4 w-full md:col-span-3">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                        {activePlatform + ' Games' || 'Games'}
                    </h2>
                    <CustomSelectbox
                        options={gamesPlatforms.map((p) => ({ id: p.id, name: p.name }))}
                        head={activePlatform || 'Platforms'}
                        onSelect={handleSelect}
                    />
                    {isLoading ? (
                        <Shimmer variant="card" />
                    ) : searchFilteredGamesList.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-40">
                                {searchFilteredGamesList.map((game) => (
                                    <Card
                                        key={game.id}
                                        name={game.name}
                                        bgSrc={game.background_image}
                                        rating={game.rating}
                                        platforms={game.platforms}
                                    />
                                ))}
                            </div>
                            {isFetchingMore && <Shimmer variant="card" />}
                            <div ref={ref} className="h-1" />
                        </>
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
