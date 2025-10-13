type game = {
    added: number;
    id: number;
    name: string;
    slug: string;
};

export type gameGenre = {
    games: game[];
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
};

export type gamePlatform = {
    games: game[];
    games_count: number;
    id: number;
    image: string;
    image_background: string;
    name: string;
    slug: string;
    year_start: number;
    year_end: number;
};

type gameResGenre = {
    games_count: number;
    id: string;
    image_background: string;
    name: string;
    slug: string;
};

type platform = {
    id: number;
    name: string;
    slug: string;
};

type platformEntry = {
    platform: platform;
};

export type gameRes = {
    added: number;
    background_image: string;
    genres: gameResGenre[];
    id: number;
    name: string;
    parentPlatforms: platformEntry[];
    platforms: platformEntry[];
    rating: number;
};
