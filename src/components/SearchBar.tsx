import { Search } from 'lucide-react';
import useGamesStore from '../store/useGamesStore';

interface SearchBarProps {
    label?: string;
}

export const SearchBar = ({ label = 'Search for games...' }: SearchBarProps) => {
    const { searchTerm, setSearchTerm } = useGamesStore();

    return (
        <div className="relative w-full max-w-7xl">
            <span className="absolute top-1/2 -translate-y-1/2 pl-3 text-gray-800 dark:text-gray-200">
                <Search />
            </span>
            <input
                type="text"
                placeholder={label}
                className="outline-none border border-black dark:border-white text-gray-800 dark:text-gray-200 rounded-full p-1.5 pl-12 w-full text-lg"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};
