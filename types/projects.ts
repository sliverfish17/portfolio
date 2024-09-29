import type { ContentfulAsset } from '~/types/contentful';

export interface ProjectFields {
  name: string;
  technologies: string[];
  order: number;
  id: number;
  thumbnail: ContentfulAsset;
  description: string;
  url?: string;
}
