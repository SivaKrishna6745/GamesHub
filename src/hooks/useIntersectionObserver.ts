import { useEffect, useRef, useState } from 'react';

type ObserverOptions = {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
};

const useIntersectionObserver = ({ threshold = 0.5, root = null, rootMargin = '0px' }: ObserverOptions) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                root,
                rootMargin,
                threshold,
            }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [root, rootMargin, threshold]);

    return { ref, isIntersecting };
};

export default useIntersectionObserver;
