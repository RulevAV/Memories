import {PaginatorEntity} from './paginator-entity';

export default interface Area {
  id?: string;
  nume?: string;
  imj?: string;
}
export interface PaginatorArea extends PaginatorEntity<Area> {
}
