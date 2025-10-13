import { Image } from './Image';

interface CardProps {
    name: string;
    bgSrc: string;
    rating: number;
}

export const Card = ({ name, bgSrc, rating }: CardProps) => {
    return (
        <div className="cursor-pointer flex flex-col items-start bg-gray-200 dark:bg-gray-800 rounded-md hover:scale-105 transition-all duration-300 max-h-[400px]">
            <Image src={bgSrc} width={'100%'} className="rounded-t-md lg:min-h-[250px] lg:max-h-[250px]" />
            <div className="px-4 text-left flex justify-between items-center gap-4 my-6 w-full">
                <p className="text-gray-800 dark:text-gray-200 text-xl font-semibold">{name}</p>
                <p className="text-green-400 text-sm font-semibold bg-gray-300/60 rounded-md px-2 py-1">
                    {Math.round((rating / 5) * 100)}
                </p>
            </div>
        </div>
    );
};
