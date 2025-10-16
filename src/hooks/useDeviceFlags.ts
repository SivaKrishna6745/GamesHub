import { useEffect } from 'react';
import useGamesStore from '../store/useGamesStore';

export const useDeviceFlags = () => {
    const { deviceType, setDeviceType } = useGamesStore();

    useEffect(() => {
        const resizeListener = () => {
            const width = window.innerWidth;
            if (width < 420) {
                setDeviceType('mobile');
            } else if (width >= 420 && width < 769) {
                setDeviceType('tablet');
            } else {
                setDeviceType('desktop');
            }
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    return {
        isMobile: deviceType === 'mobile',
        isTablet: deviceType === 'tablet',
        isDesktop: deviceType === 'desktop',
    };
};
