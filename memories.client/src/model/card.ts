import Area from './area';

export interface Card {
  id: string;
  idArea: string;
  title?: string;
  content?: string;
  img?: Uint8Array;
  idParent?: string;
  number: number;
  mimeType?: string;
  idAreaNavigation?: Area;
}