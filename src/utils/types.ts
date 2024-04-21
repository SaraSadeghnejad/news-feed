export type NewsItem = {
  urlToImage?: string;
  title?: string | undefined;
  webTitle?: string;
  abstract?: string;
  webUrl?: string;
  url?: string;
};
type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];
export interface IStoreSlice {
  fromDate: Value;
  setFromDate: (value: Value) => void;
  toDate: Value;
  setToDate: (value: Value) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedSource: string;
  setSelectedSource: (value: string) => void;
  CategoryList: { id: string };
  AuthorList: { id: string };
  SourceList: { id: string };
  addToFavoriteList: (type: string, id: string) => void;
}
export type SelectItems = {
  id: string;
  name: string;
  author?: string;
  edition?: string;
  byline?: { original: string };
  type?: string;
};
export type NewYorkTimes = {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_section: string;
  print_page: string;
  source: string;
  multimedia: string[];
  headline: {
    main: string;
    kicker: string | null;
    content_kicker: string | null;
    print_headline: string;
    name: string | null;
    seo: string | null;
    sub: string | null;
  };
  keywords: string[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: {
    original: string | null;
    person: string[] | null;
    organization: string | null;
  };
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
};
export type NEWSAPI ={
  source:{
    id: string;
    name: string;
  },
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
export type GURDIANS={
  id: string;
  type: string;
  sectionId: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}
export type MyArrayTypes = GURDIANS | NEWSAPI | NewYorkTimes;
export interface FilteredDate {
  publication_date?: string | Date;
  pub_date?: string;
  publishedAt?: string;
}
export interface FilteredSource{
 source?:{name:string}; sectionName?:string;
}
export type QueryPayload =
  | { slug: string; slugPrim: string; [key: string]: string }
  | { slug: string; [key: string]: string };
export type QueryKey = [string, QueryPayload] | [string];