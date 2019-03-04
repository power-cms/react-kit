export enum SiteType {
  text = 'Text',
  blog = 'Blog',
}

export interface ISite {
  id: string;
  title: string;
  url: string;
  content: string;
  type: SiteType;
}
