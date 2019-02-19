import { GridState } from '../Board';
import AbstractPiece from './AbstractPiece';
import Color from './Color';

export default class JPiece extends AbstractPiece {
  public orientation: 'Left' | 'Up' | 'Down' | 'Right' = 'Right';

  public constructor() {
    super(Color.Silver);
  }

  public canMoveDown(grid: GridState, column: number, row: number): boolean {
    switch (this.orientation) {
      case 'Down':
        if (row + 2 > grid.length) {
          return false;
        }
        if (
          grid[row + 1][column + 1] !== null ||
          grid[row][column] !== null ||
          grid[row][column - 1] !== null ||
          grid[row][column + 1] !== null
        ) {
          return false;
        }
        break;
      case 'Left':
        if (row + 3 > grid.length) {
          return false;
        }
        if (grid[row + 2][column - 1] !== null || grid[row + 2][column]) {
          return false;
        }
        break;

      case 'Right':
        if (row + 3 > grid.length) {
          return false;
        }
        if (grid[row + 2][column - 1] !== null || grid[row][column] !== null) {
          return false;
        }
        break;

      case 'Up':
        if (row + 2 > grid.length) {
          return false;
        }
        if (
          grid[row + 1][column] !== null ||
          grid[row + 1][column + 1] !== null ||
          grid[row + 1][column - 1] !== null
        ) {
          return false;
        }
        break;

      default:
        return true;
    }

    return true;
  }
  public storeOnGrid(grid: GridState, column: number, row: number): GridState {
    const newGrid = grid.slice();

    switch (this.orientation) {
      case 'Down':
        newGrid[row - 1][column - 1] = this.color;
        newGrid[row - 1][column] = this.color;
        newGrid[row - 1][column + 1] = this.color;
        newGrid[row][column + 1] = this.color;
        break;
      case 'Left':
        newGrid[row - 1][column] = this.color;
        newGrid[row + 1][column] = this.color;
        newGrid[row][column] = this.color;
        newGrid[row + 1][column - 1] = this.color;
        break;
      case 'Right':
        newGrid[row - 1][column] = this.color;
        newGrid[row - 1][column - 1] = this.color;
        newGrid[row][column - 1] = this.color;
        newGrid[row + 1][column - 1] = this.color;
        break;
      case 'Up':
        newGrid[row][column + 1] = this.color;
        newGrid[row][column] = this.color;
        newGrid[row][column - 1] = this.color;
        newGrid[row - 1][column - 1] = this.color;
        break;

      default:
        break;
    }

    return newGrid;
  }

  public checkLeft(grid: GridState, column: number, row: number): boolean {
    switch (this.orientation) {
      case 'Down':
        return !(grid[row - 1][column - 2] !== null);
      case 'Left':
        return !(grid[row + 1][column - 2] !== null);
      case 'Up':
        return !(grid[row][column - 2] !== null || grid[row - 1][column - 2]);
      case 'Right':
        return !(
          grid[row][column - 2] !== null ||
          grid[row - 1][column - 2] !== null ||
          grid[row + 1][column - 2] !== null
        );

      default:
        return true;
    }
  }

  public checkRight(grid: GridState, column: number, row: number): boolean {
    switch (this.orientation) {
      case 'Down':
        if (column + 2 >= grid[0].length) {
          return false;
        }

        return !(grid[row][column + 2] !== null || grid[row - 1][column + 2]);
      case 'Left':
        if (column + 1 >= grid[0].length) {
          return false;
        }

        return !(
          grid[row + 1][column + 1] !== null ||
          grid[row][column + 1] !== null ||
          grid[row - 1][column + 1] !== null
        );
      case 'Up':
        if (column + 2 >= grid[0].length) {
          return false;
        }

        return !(grid[row][column + 2] !== null);
      case 'Right':
        if (column + 1 >= grid[0].length) {
          return false;
        }

        return !(
          grid[row - 1][column + 1] !== null ||
          grid[row][column] !== null ||
          grid[row + 1][column] !== null
        );
      default:
        return true;
    }
  }

  public rotateClockwise(
    grid: GridState,
    column: number,
    row: number,
    setColumn: (amount: number) => void,
  ): void {
    switch (this.orientation) {
      case 'Down':
        this.orientation = 'Left';
        break;
      case 'Left':
        this.orientation = 'Up';
        break;
      case 'Up':
        this.orientation = 'Right';
        break;
      case 'Right':
        this.orientation = 'Down';
        break;

      default:
        break;
    }
  }

  public rotateCounterClockwise(
    grid: GridState,
    column: number,
    row: number,
    setColumn: (amount: number) => void,
  ): void {
    switch (this.orientation) {
      case 'Down':
        this.orientation = 'Right';
        break;
      case 'Right':
        this.orientation = 'Up';
        break;
      case 'Up':
        this.orientation = 'Left';
        break;
      case 'Left':
        this.orientation = 'Down';
        break;

      default:
        break;
    }
  }
}
