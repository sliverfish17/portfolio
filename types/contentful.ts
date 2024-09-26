export interface ContentfulFile {
  url: string;
}

export interface ContentfulAsset<T = ContentfulFile> {
  fields: T;
}

export interface ContentfulItem<TFields = Record<string, any>> {
  fields: TFields;
}

export interface ContentfulResponse<TFields = Record<string, any>> {
  items: ContentfulItem<TFields>[];
}
