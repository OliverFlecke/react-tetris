import React, { useEffect, useState } from 'react';
import * as styles from './Board.module.scss';
import AbstractPiece from './Pieces/AbstractPiece';
import Color from './Pieces/Color';
import IPiece from './Pieces/IPiece';
import Piece from './Pieces/Pieces';

export type Direction = 'Left' | 'Right';

const speed = 200;

interface BoardProps {
  width: number;
  height: number;
}

const Board = (props: BoardProps) => {
  const [grid, setGrid] = useState(
    new Array(props.height)
      .fill(null)
      .map(() => new Array(props.width).fill(null)),
  );

  const storePiece = (
    piece: AbstractPiece | null,
    column: number,
    row: number,
  ) => {
    if (piece === null) {
      return;
    }

    setGrid(checkRows(piece.storeOnGrid(grid, column, row), props.width));
  };

  return (
    <div className={styles.container}>
      <Grid grid={grid} />
      <Overlay {...props} grid={grid} storePiece={storePiece} />
    </div>
  );
};

export type GridState = Array<Array<Color | null>>;

interface GridProps {
  grid: GridState;
}

const Grid = (props: GridProps) => {
  return (
    <div className={styles.gridContainer}>
      {props.grid.map((rowElements: any[], xIndex: number) =>
        rowElements.map((_: any[], yIndex: number) => {
          const color = props.grid[xIndex][yIndex];

          return (
            <div
              key={`${xIndex} ${yIndex}`}
              className={styles.visibleCell}
              style={{
                backgroundColor: color ? color : '#555',
                borderColor: color ? 'black' : 'white',
              }}
            />
          );
        }),
      )}
    </div>
  );
};

interface OverlayProps extends BoardProps {
  storePiece: (
    piece: AbstractPiece | null,
    column: number,
    row: number,
  ) => void;
  grid: GridState;
}

const Overlay = (props: OverlayProps) => {
  let id: NodeJS.Timeout;
  const initialRow = 1;
  const initialColumn = props.width / 2;

  const [row, setRow] = useState(initialRow);
  const [column, setColumn] = useState(initialColumn);
  const [piece, setPiece] = useState<AbstractPiece | null>(new IPiece());

  useEffect(() => {
    if (piece !== null) {
      id = setInterval(() => moveDown(1), speed);

      return () => clearInterval(id);
    }
  }, [row]);

  const newPiece = () => {
    props.storePiece(piece, column, row);
    setRow(initialRow);
    setColumn(initialColumn);

    if (
      props.grid[initialRow][initialColumn] !== null ||
      props.grid[initialRow][initialColumn - 1] !== null
    ) {
      console.log('Game over');
      clearInterval(id);
      setPiece(null);
    } else {
      setPiece(new IPiece());
    }
  };

  const moveDown = (amount: number) => {
    if (piece === null) {
      return;
    }
    console.debug(column);

    if (piece.canMoveDown(props.grid, column, row)) {
      setRow(row + amount);
    } else {
      console.debug('Cant move down');
      setTimeout(() => newPiece(), speed / 2);
    }
  };

  const moveSideways = (direction: Direction) => {
    if (piece === null) {
      return;
    }

    if (
      direction === 'Left' &&
      column > 1 &&
      piece.checkLeft(props.grid, column, row)
    ) {
      setColumn(column - 1);
    } else if (
      direction === 'Right' &&
      column <= 10 - piece.width &&
      piece.checkRight(props.grid, column, row)
    ) {
      setColumn(column + 1);
    }
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          if (piece) {
            piece.rotateClockwise(props.grid, column, row, setColumn);
          }
          break;
        case 'ArrowDown':
          moveDown(1);
          break;
        case 'ArrowRight':
          moveSideways('Right');
          break;
        case 'ArrowLeft':
          moveSideways('Left');
          break;
        case ' ':
          // moveDown(20);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', keyDownHandler);

    return () => window.removeEventListener('keydown', keyDownHandler);
  });

  return (
    <div className={styles.gridContainer}>
      {new Array(props.width * props.height).fill(null).map((_, index) => (
        <div key={index} className={styles.hiddenCell} />
      ))}
      {piece ? (
        <Piece row={row} column={column} direction={0} piece={piece} />
      ) : null}
    </div>
  );
};

function checkRows(grid: GridState, width: number): GridState {
  let rowsCleared = 0;

  const newGrid = grid.reduce((rows: GridState, row: Array<Color | null>) => {
    if (row.every(x => x !== null)) {
      const newRows = rows.slice();
      newRows.unshift(new Array(width).fill(null));
      rowsCleared++;

      return newRows;
    } else {
      rows.push(row);

      return rows;
    }
  }, []);

  return newGrid;
}

export default Board;
