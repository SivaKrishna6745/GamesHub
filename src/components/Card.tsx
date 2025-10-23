import type { PlatformEntry } from '../types';
import { Image } from './Image';
import { platformsSymbols } from '../constants/constants';
import { getPlatformKey } from '../utils/utils';
import type { Ref } from 'react';

interface CardProps {
    name: string;
    bgSrc: string;
    rating: number;
    platforms: PlatformEntry[];
    ref?: Ref<HTMLDivElement | null>;
}

export const Card = ({ name, bgSrc, rating, platforms, ref }: CardProps) => {
    let currGameSymbols = new Set<string>();
    platforms.forEach((plat) => {
        const slug = plat.platform.slug;
        const groupKey = getPlatformKey(slug);
        if (!groupKey || currGameSymbols.has(groupKey)) return null;
        currGameSymbols.add(groupKey);
    });
    return (
        <div
            ref={ref}
            className="cursor-pointer flex flex-col items-start bg-gray-200 dark:bg-gray-800 rounded-md transition-all duration-250 hover:scale-103 shadow-[0_0_4px_rgba(0,0,0,1)] hover:shadow-[3px_3px_12px_rgba(0,0,0,1)]"
        >
            <Image src={bgSrc} width={'100%'} height={250} className="rounded-t-md h-[300px]" />
            <div className="flex flex-col gap-4 my-4 px-4 w-full">
                <div className="flex gap-2">
                    {Array.from(currGameSymbols).map((symbol) => {
                        const Icon = platformsSymbols[symbol];
                        return Icon ? <Icon key={symbol} size={16} title={symbol} color="gray" /> : null;
                    })}
                </div>
                <div className="text-left flex justify-between items-center gap-4 w-full">
                    <p className="text-gray-800 dark:text-gray-200 text-xl font-semibold">{name}</p>
                    <p className="text-green-400 text-sm font-semibold bg-gray-300/60 rounded-md px-2 py-1">
                        {Math.round((rating / 5) * 100)}
                    </p>
                </div>
            </div>
        </div>
    );
};
