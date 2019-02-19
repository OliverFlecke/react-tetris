import { GridState } from '../Board';
import AbstractPiece from './AbstractPiece';
import Color from './Color';

export default class IPiece extends AbstractPiece {
  public orientation: 'Horizontal' | 'Vertical' = 'Horizontal';

  public constructor() {
    super(Color.Maroon);
    this.width = 4;
    this.height = 1;
  }

  public canMoveDown(grid: GridState, column: number, row: number): boolean {
    if (this.orientation === 'Horizontal') {
      if (row + this.height > grid.length) {
        return false;
      }

      return [-1, 0, 1, 2].every(
        x => column + x >= grid[0].length || grid[row][column + x] === null,
      );
    } else if (this.orientation === 'Vertical') {
      if (row + this.height >= grid.length) {
        return false;
      }

      return grid[row + this.height][column - 1] === null;
    }

    return false;
  }
  public storeOnGrid(grid: GridState, column: number, row: number): GridState {
    const newGrid = grid.slice();

    if (this.orientation === 'Horizontal') {
      [-1, 0, 1, 2].forEach(x => (newGrid[row - 1][column + x] = this.color));
    } else if (this.orientation === 'Vertical') {
      [0, 1, 2, 3].forEach(x => (newGrid[row + x][column - 1] = this.color));
    }

    return newGrid;
  }

  public checkLeft(grid: GridState, column: number, row: number): boolean {
    if (this.orientation === 'Horizontal') {
      if (grid[row][column - 2] !== null) {
        return false;
      }
    }

    if (this.orientation === 'Vertical') {
      return ![0, 1, 2, 3].some(x => grid[row + x][column - 2] !== null);
    }

    return true;
  }
  public checkRight(grid: GridState, column: number, row: number): boolean {
    if (this.orientation === 'Horizontal') {
      if (grid[row][column + 3] !== null) {
        return false;
      }
    }

    if (this.orientation === 'Vertical') {
      return ![0, 1, 2, 3].some(x => grid[row + x][column] !== null);
    }

    return true;
  }

  public rotateClockwise(grid: GridState, column: number, row: number) {
    if (this.orientation === 'Vertical') {
      if (column + 2 < grid[0].length) {
        this.orientation = 'Horizontal';
        this.width = 4;
        this.height = 1;
      }
    } else {
      this.width = 1;
      this.height = 4;

      this.orientation = 'Vertical';
    }
  }

  public rotateCounterClockwise(grid: GridState, column: number, row: number) {
    this.rotateClockwise(grid, column, row);
  }
}
