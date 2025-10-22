import { useEffect, useRef, useState } from 'react';

type ObserverOptions = {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
};

const useIntersectionObserver = ({ threshold = 0, root = null, rootMargin = '0px' }: ObserverOptions) => {
    console.log('inside intersection observer');
    const ref = useRef<HTMLDivElement | null>(null);
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
    useEffect(() => {
        console.log('inside use effect');
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
    }, [ref.current, root, rootMargin, threshold]);

    return { ref, isIntersecting };
};

export default useIntersectionObserver;
