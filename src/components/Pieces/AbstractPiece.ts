import { Direction, GridState } from '../Board';
import Color from './Color';

export default abstract class AbstractPiece {
  public color: Color;
  public orientation: string | undefined;
  public width: number = 0;
  public height: number = 0;

  public constructor(color: Color) {
    this.color = color;
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

  public abstract rotateClockwise(
    grid: GridState,
    column: number,
    row: number,
    setColumn: (amount: number) => void,
  ): void;
  public abstract rotateCounterClockwise(
    grid: GridState,
    column: number,
    row: number,
    setColumn: (amount: number) => void,
  ): void;
}
