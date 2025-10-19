import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
    const selectboxRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleOutsideClickorScroll = (e: React.MouseEvent | Event | KeyboardEvent) => {
            const target = e.target;
            if (selectboxRef.current && !selectboxRef.current.contains(target as Node)) {
                setIsOpen(false);
            }
            if ((e as KeyboardEvent).key === 'Escape') {
                setIsOpen(false);
            }
            if (e.type === 'scroll') {
                setIsOpen(false);
            }
        };
        window.addEventListener('mousedown', handleOutsideClickorScroll);
        window.addEventListener('scroll', handleOutsideClickorScroll);
        window.addEventListener('keydown', handleOutsideClickorScroll);
        return () => {
            window.removeEventListener('mousedown', handleOutsideClickorScroll);
            window.removeEventListener('scroll', handleOutsideClickorScroll);
            window.removeEventListener('keydown', handleOutsideClickorScroll);
        };
    }, []);

    return (
        <div className="relative z-50" ref={selectboxRef}>
            <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 hover:dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md flex justify-between items-center cursor-pointer transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{head}</span>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isOpen && (
                <ul className="absolute w-max top-12 left-0 bg-gray-200 dark:bg-neutral-950 rounded-md text-gray-800 dark:text-gray-200 max-h-[50dvh] overflow-y-auto px-2 py-1">
                    {options.map((option) => (
                        <li
                            key={option.id}
                            className="p-2 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-800"
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
