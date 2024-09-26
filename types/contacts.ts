import type { ContentfulAsset, ContentfulFile, ContentfulResponse } from './contentful';

export interface ContactFields {
  name: string;
  link: string;
  icon: ContentfulAsset<{ file: ContentfulFile }>;
}

export interface MappedContactLink {
  name: string;
  link: string;
  iconUrl: string;
}

export type ContactResponse = ContentfulResponse<ContactFields>;
