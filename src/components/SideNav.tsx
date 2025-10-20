import { useEffect, useRef, useState } from 'react';
import useGamesStore from '../store/useGamesStore';
import { Button } from './Button';
import { Image } from './Image';

type SideNavItem = {
    id: number;
    name: string;
    src: string;
};

interface SideNavProps {
    heading: string;
    items: SideNavItem[];
    className?: string;
    mobileNav?: boolean;
}

const SideNav = ({ heading, items, className, mobileNav }: SideNavProps) => {
    const { activeGenre, setActiveGenre } = useGamesStore();
    const navRef = useRef<HTMLDivElement>(null);
    const [isStuck, setIsStuck] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!navRef.current) return;
            const { top } = navRef.current.getBoundingClientRect();
            setIsStuck(top <= 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (mobileNav)
        return (
            <nav
                className={`sticky top-0 -left-4 -right-4 z-50 overflow-x-auto w-full ${
                    isStuck
                        ? 'z-60 bg-white/90 dark:bg-slate-900 p-4 [box-shadow:-2px_1px_5px_rgba(0,0,0,1),2px_1px_5px_rgba(0,0,0,1)]'
                        : ''
                }`}
                ref={navRef}
            >
                <h2 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">{heading}</h2>
                <ul className="flex overflow-x-auto gap-4">
                    {items.map((item) => {
                        return (
                            <li
                                key={item.id}
                                className={`flex flex-col items-center gap-2 text-sm text-gray-800 dark:text-gray-200 cursor-pointer ${
                                    activeGenre === item.name && 'font-bold'
                                }`}
                                onClick={() => setActiveGenre(item.name)}
                            >
                                <Image src={item.src} className="rounded-lg h-10 w-10" />
                                <Button label={item.name} />
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );

    return (
        <nav className={`flex flex-col ${className}`}>
            <h2 className="text-xl font-semibold text-left mb-4 text-gray-800 dark:text-gray-200">{heading}</h2>
            <ul className="flex flex-col gap-5">
                {items.map((item) => {
                    return (
                        <li
                            key={item.id}
                            className={`flex items-center gap-4 text-gray-800 dark:text-gray-200 cursor-pointer ${
                                activeGenre === item.name && 'font-bold'
                            }`}
                            onClick={() => setActiveGenre(item.name)}
                        >
                            <Image src={item.src} className="rounded-lg h-10 w-10" />
                            <Button label={item.name} />
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default SideNav;
