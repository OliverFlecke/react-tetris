import { GridState } from '../Board';
import Color from './Color';

interface Position {
  column: number;
  row: number;
}

export default abstract class AbstractPiece {
  public color: Color;
  public orientation: 0 | 1 | 2 | 3;
  public width: number = 0;

  public constructor(color: Color) {
    this.color = color;
    this.orientation = 0;
  }

  public abstract canMoveDown(
    grid: GridState,
    column: number,
    row: number,
  ): boolean;

  public abstract storeOnGrid(
    grid: GridState,
    column: number,
    row: number,
  ): GridState;

  public abstract checkLeft(
    grid: GridState,
    column: number,
    row: number,
  ): boolean;

  public abstract checkRight(
    grid: GridState,
    column: number,
    row: number,
  ): boolean;
}
