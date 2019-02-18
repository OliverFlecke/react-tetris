import React, { useState } from 'react';
import * as styles from './Board.module.scss';
import OPiece from './Pieces/OPiece';
import Piece from './Pieces/Pieces';

interface BoardProps {
  width: number;
  height: number;
}

const Board = (props: BoardProps) => {
  const [currentPiece, setCurrentPiece] = useState(new OPiece());

  const [grid, setGrid] = useState(
    new Array(props.width)
      .fill(null)
      .map(() => new Array(props.height).fill(null)),
  );

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {grid.map((row: any[], rowIndex: number) =>
          row.map((x: any[], columnIndex: number) => (
            <div
              key={`${rowIndex} ${columnIndex}`}
              className={styles.visibleCell}
            />
          )),
        )}
      </div>
      <div className={styles.gridContainer}>
        {new Array(props.width * props.height).fill(null).map((x, index) => (
          <div key={index} className={styles.hiddenCell} />
        ))}
        <Piece piece={currentPiece} />
      </div>
    </div>
  );
};

export default Board;
