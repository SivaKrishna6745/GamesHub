import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

type SelectboxItem = {
    id: number;
    name: string;
};

interface CustomSelectboxProps {
    head?: string;
    options: SelectboxItem[];
}

const CustomSelectbox = ({ head = 'Select', options }: CustomSelectboxProps) => {
    console.log(options);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <button
                className="px-4 py-2 min-w-44 bg-white/20 dark:bg-black/20 hover:bg-black/20 hover:dark:bg-white/20 text-gray-800 dark:text-gray-200 rounded-md flex justify-between items-center cursor-pointer transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{head}</span>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isOpen && (
                <ul className="border border-gray-700 dark:border-gray-300 rounded-md text-gray-800 dark:text-gray-200">
                    {options.map((option) => (
                        <li key={option.id} className="p-2 cursor-pointer hover:bg-black/20">
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelectbox;
