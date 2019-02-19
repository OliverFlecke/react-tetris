import { GridState } from '../Board';
import AbstractPiece from './AbstractPiece';
import Color from './Color';

export default class OPiece extends AbstractPiece {
  public constructor() {
    super(Color.Cyan);
    this.width = 2;
  }

  public canMoveDown(grid: GridState, column: number, row: number): boolean {
    if (row + 1 >= grid.length) {
      return false;
    }

    if (grid[row + 1][column] !== null || grid[row + 1][column - 1] !== null) {
      return false;
    }

    return true;
  }

  public storeOnGrid(grid: GridState, column: number, row: number): GridState {
    const newGrid = grid.slice(0);

    newGrid[row][column] = this.color;
    newGrid[row - 1][column] = this.color;
    newGrid[row][column - 1] = this.color;
    newGrid[row - 1][column - 1] = this.color;

    return newGrid;
  }

  public checkLeft(grid: GridState, column: number, row: number): boolean {
    if (grid[row][column - 2] !== null) {
      return false;
    }

    return true;
  }

  public checkRight(grid: GridState, column: number, row: number): boolean {
    if (grid[row][column + 1] !== null) {
      return false;
    }

    return true;
  }
}
