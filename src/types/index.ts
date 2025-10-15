type Game = {
    added: number;
    id: number;
    name: string;
    slug: string;
};

export type GameGenre = {
    games: Game[];
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
};

export type GamePlatform = {
    games: Game[];
    games_count: number;
    id: number;
    image: string;
    image_background: string;
    name: string;
    slug: string;
    year_start: number;
    year_end: number;
};

type GameResGenre = {
    games_count: number;
    id: string;
    image_background: string;
    name: string;
    slug: string;
};

type Platform = {
    id: number;
    name: string;
    slug: string;
};

export type PlatformEntry = {
    platform: Platform;
};

export type GameRes = {
    added: number;
    background_image: string;
    genres: GameResGenre[];
    id: number;
    name: string;
    parentPlatforms: PlatformEntry[];
    platforms: PlatformEntry[];
    rating: number;
};

export type FilterType = 'genre' | 'platform';
