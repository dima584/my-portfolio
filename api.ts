
import { ArtworksResponse } from './types.js';

export async function fetchArtworksData(): Promise<ArtworksResponse> {
    const url = 'https://api.artic.edu/api/v1/artworks?limit=4&fields=id,title,artist_display,image_id,date_display';
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Помилка сервера: ${response.status}`);
    }

    const data: ArtworksResponse = await response.json();
    return data;
}