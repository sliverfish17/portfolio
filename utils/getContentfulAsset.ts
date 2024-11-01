import type { ContentfulAsset } from '~/types/contentful';

export function getContentfulAsset(asset?: ContentfulAsset): string {
  return asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : '';
}
