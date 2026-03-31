
export interface Project {
    id: number;
    title: string;
    image: string;
    description: string;
    link: string | null;
    category: string;
}

export interface Artwork {
    id: number;
    title: string;
    artist_display: string;
    image_id: string | null;
    date_display: string | null;
}

export interface ArtworksResponse {
    data: Artwork[];
}