type ShimmerProps = {
    variant: 'card' | 'desktop-nav' | 'mobile-nav';
};

export const Shimmer = ({ variant }: ShimmerProps) => {
    switch (variant) {
        case 'card':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <div className="bg-gray-300 dark:bg-gray-700 w-full max-w-sm aspect-[3/2] rounded-md animate-pulse"></div>
                            <div className="bg-gray-300 dark:bg-gray-700 h-[25px] rounded-md animate-pulse"></div>
                            <div className="bg-gray-300 dark:bg-gray-700 h-[25px] rounded-md animate-pulse"></div>
                        </div>
                    ))}
                </div>
            );
        case 'desktop-nav':
            return (
                <div className="flex flex-col gap-4">
                    <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center bg-gray-300 dark:bg-gray-700 h-10 w-30 rounded-md animate-pulse"
                        ></div>
                    ))}
                </div>
            );
        case 'mobile-nav':
            return (
                <div className="flex flex-col gap-4">
                    <div className="h-5 w-20 rounded-md self-center bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex gap-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex bg-gray-300 dark:bg-gray-700 h-12 w-12 rounded-sm animate-pulse"></div>
                                <div className="flex bg-gray-300 dark:bg-gray-700 h-5 rounded-sm animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        default:
            return null;
    }
};
