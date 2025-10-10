import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

type SelectboxItem = {
    id: number;
    name: string;
};

interface CustomSelectboxProps {
    head?: string;
    onSelect: (option: string) => void;
    options: SelectboxItem[];
}

const CustomSelectbox = ({ head = 'Select', onSelect, options }: CustomSelectboxProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-4">
            <button
                className="px-4 py-2 max-w-44 bg-white/20 dark:bg-black/20 hover:bg-black/20 hover:dark:bg-white/20 text-gray-800 dark:text-gray-200 rounded-md flex justify-between items-center cursor-pointer transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{head}</span>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isOpen && (
                <ul className="max-w-52 border border-gray-700 dark:border-gray-300 rounded-md text-gray-800 dark:text-gray-200">
                    {options.map((option) => (
                        <li
                            key={option.id}
                            className="p-2 cursor-pointer hover:bg-black/20"
                            onClick={() => {
                                onSelect(option.name);
                                setIsOpen(false);
                            }}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelectbox;
