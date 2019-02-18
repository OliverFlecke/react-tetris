import React, { useEffect, useState } from 'react';
import * as styles from './Board.module.scss';
import OPiece from './Pieces/OPiece';
import Piece from './Pieces/Pieces';

const speed = 1000;

interface BoardProps {
  width: number;
  height: number;
}

const Board = (props: BoardProps) => {
  const [grid, setGrid] = useState(
    new Array(props.width)
      .fill(null)
      .map(() => new Array(props.height).fill(null)),
  );

  return (
    <div className={styles.container}>
      <Grid grid={grid} />
      <Overlay {...props} />
    </div>
  );
};

interface GridProps {
  grid: any[][];
}

const Grid = (props: GridProps) => (
  <div className={styles.gridContainer}>
    {props.grid.map((rowElements: any[], xIndex: number) =>
      rowElements.map((_: any[], columnIndex: number) => (
        <div key={`${xIndex} ${columnIndex}`} className={styles.visibleCell} />
      )),
    )}
  </div>
);

const Overlay = (props: BoardProps) => {
  const [row, setRow] = useState(1);
  const [piece, setPiece] = useState(new OPiece());
  const [column, setColumn] = useState(props.width / 2);

  useEffect(() => {
    const id = setInterval(() => {
      setRow(row + 1);
    }, speed);

    return () => clearInterval(id);
  }, [row]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      console.debug(event.key);
      switch (event.key) {
        case 'ArrowDown':
          setRow(row + 1);
          break;
        case 'ArrowRight':
          setColumn(column + 1);
          break;
        case 'ArrowLeft':
          setColumn(column - 1);
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
      <Piece row={row} column={column} direction={0} color={piece.color} />
    </div>
  );
};

export default Board;
