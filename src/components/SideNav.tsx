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
}

const SideNav = ({ heading, items }: SideNavProps) => {
    const { setActiveGenre } = useGamesStore();

    return (
        <>
            <nav className="flex flex-col">
                <h2 className="text-xl font-semibold text-left mb-4 text-gray-800 dark:text-gray-200">{heading}</h2>
                <ul className="flex flex-col gap-5">
                    {items.map((item) => {
                        return (
                            <li key={item.id} className="flex items-center gap-4 text-gray-800 dark:text-gray-200">
                                <Image src={item.src} className="rounded-lg h-10 w-10" />
                                <Button label={item.name} onClick={() => setActiveGenre(item.name)} />
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
};

export default SideNav;
