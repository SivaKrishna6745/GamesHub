import { Search } from 'lucide-react';

interface SearchBarProps {
    label?: string;
}

export const SearchBar = ({ label = 'Search games...' }: SearchBarProps) => {
    return (
        <div className="relative w-full max-w-7xl">
            <span className="absolute top-1/2 -translate-y-1/2 pl-3">
                <Search />
            </span>
            <input
                type="text"
                placeholder={label}
                className="outline-none border border-black dark:border-white rounded-full p-1.5 pl-12 w-full text-lg"
            />
        </div>
    );
};
