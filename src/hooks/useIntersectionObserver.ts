import { useEffect, useRef, useState } from 'react';

type ObserverOptions = {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
};

const useIntersectionObserver = ({ threshold = 0.5, root = null, rootMargin = '0px' }: ObserverOptions = {}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const target = ref.current;
        if (!target) {
            console.log('Observer element not ready', ref, ref.current);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log('✅ Hook triggered:', entry.isIntersecting);
                setIsIntersecting(entry.isIntersecting);
            },
            { root, rootMargin, threshold }
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [ref.current, root, rootMargin, threshold]);

    return { ref, isIntersecting };
};

export default useIntersectionObserver;
