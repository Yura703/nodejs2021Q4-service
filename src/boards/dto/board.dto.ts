import { IColumn } from '../entities/board.entity';

export class BoardDto {
  title?: string;
  columns?: IColumn[];
}
