interface ImageProps {
    src: string;
    alt?: string;
    height?: number;
    width?: number;
    className?: string;
}

export const Image = ({ src, alt = 'Image', height = 100, width = 100, className }: ImageProps) => {
    return <img src={src} alt={alt} height={height} width={width} className={className} />;
};
