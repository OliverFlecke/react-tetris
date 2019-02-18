import { Color } from 'csstype';
import React from 'react';
import * as boardStyles from '../Board.module.scss';
import * as styles from './Pieces.module.scss';

interface PieceProps {
  column: number;
  row: number;
  color: Color;
  direction: 0 | 1 | 2 | 3;
}

const Piece = (props: PieceProps) => {
  return <OPieceComponent {...props} />;
};

const OPieceComponent = (props: PieceProps) => {
  return (
    <div
      className={styles.OPiece}
      style={{
        gridColumnStart: props.column,
        gridRowStart: props.row,
        backgroundColor: props.color,
      }}
    >
      {new Array(4).fill(null).map((x, index) => (
        <div key={index} className={boardStyles.activeCell} />
      ))}
    </div>
  );
};

export default Piece;
