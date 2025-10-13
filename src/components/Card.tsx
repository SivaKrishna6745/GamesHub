import { Image } from './Image';

interface CardProps {
    name: string;
    bgSrc: string;
    rating: number;
}

export const Card = ({ name, bgSrc, rating }: CardProps) => {
    return (
        <div className="cursor-pointer flex flex-col items-start bg-gray-200 dark:bg-gray-800 rounded-md hover:scale-105 transition-all duration-300">
            <Image src={bgSrc} width={'100%'} className="rounded-t-md min-h-[300px] max-h-[300px]" />
            <div className="px-4 text-left flex flex-col gap-4 my-6">
                <p className="text-gray-800 dark:text-gray-200 text-2xl">{name}</p>
                <p className="text-gray-800 dark:text-gray-200">Rating: {rating}</p>
            </div>
        </div>
    );
};
