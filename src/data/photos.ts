import photosData from './photos.json';

export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: 'landscape' | 'portrait' | 'commercial';
  title: string;
}

export const photos: Photo[] = photosData.photos as Photo[];
