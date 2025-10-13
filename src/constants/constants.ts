import type { IconType } from 'react-icons';
import { FaWindows, FaPlaystation, FaXbox, FaAndroid, FaApple, FaLinux } from 'react-icons/fa';
import { SiNintendo } from 'react-icons/si';

export const platformsSymbols: Record<string, IconType> = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    android: FaAndroid,
    ios: FaApple,
    linux: FaLinux,
    nintendo: SiNintendo,
};
