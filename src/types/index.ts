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
