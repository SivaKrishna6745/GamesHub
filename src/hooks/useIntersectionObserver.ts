import { useCallback, useState } from 'react';

type IntersectionObserverProps = {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
};

const useIntersectionObserver = ({
    threshold = 0.5,
    root = null,
    rootMargin = '0px',
}: IntersectionObserverProps = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const ref = useCallback((node: HTMLDivElement | null) => {
        if (!node) {
            console.log('Observer element not ready');
            return;
        }

        const options = {
            threshold,
            root,
            rootMargin,
        };

        const callback: IntersectionObserverCallback = (entries) => {
            const [entry] = entries;
            console.log('✅ OBSERVER TRIGGERED');
            setIsIntersecting(entry.isIntersecting);
        };

        const observer = new IntersectionObserver(callback, options);

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return { ref, isIntersecting };
};

export default useIntersectionObserver;
