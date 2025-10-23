import { useEffect, useState } from 'react';

type IntersectionObserverProps = {
    ref: React.RefObject<HTMLDivElement | null>;
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
};

const useIntersectionObserver = ({
    ref,
    threshold = 0.5,
    root = null,
    rootMargin = '0px',
}: IntersectionObserverProps) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const target = ref.current;
        if (!target) {
            console.log('Observer element not ready', ref, ref.current);
            return;
        }

        const options = {
            threshold,
            root,
            rootMargin,
        };

        const callback: IntersectionObserverCallback = (entries) => {
            const [entry] = entries;
            console.log('✅ OBSERVER TRIGGERED', entry.target, entry.isIntersecting);
            setIsIntersecting(entry.isIntersecting);
        };

        const observer = new IntersectionObserver(callback, options);

        observer.observe(target);

        return () => observer.disconnect();
    }, [ref.current]);

    return { isIntersecting };
};

export default useIntersectionObserver;
