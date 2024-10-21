export interface ContentfulFile {
  url: string;
  details?: {
    size?: number;
    image?: {
      width: number;
      height: number;
    };
  };
  fileName?: string;
  contentType?: string;
}

export interface ContentfulAsset {
  fields: {
    file: ContentfulFile;
  };
  sys?: {
    id: string;
    type: string;
  };
}

export interface ContentfulItem<TFields = Record<string, any>> {
  fields: TFields;
}

export interface ContentfulResponse<TFields = Record<string, any>> {
  items: ContentfulItem<TFields>[];
  total: number;
}
