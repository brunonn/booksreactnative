interface IndustryIdentifier {
  type: string;
  identifier: string;
}
interface ReadingMode {
  text: boolean;
  image: boolean;
}
interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}
interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface BookApiVolumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingMode;
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface BookApiItemReponse {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: BookApiVolumeInfo;
}

export interface BookItemReponse {
  title: string;
  authors: string[];
  imageLinks: ImageLinks;
}
