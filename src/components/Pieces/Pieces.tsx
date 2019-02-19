import React, { CSSProperties } from 'react';
import * as boardStyles from '../Board.module.scss';
import AbstractPiece from './AbstractPiece';
import IPiece from './IPiece';
import OPiece from './OPiece';
import * as styles from './Pieces.module.scss';

interface PieceProps {
  piece: AbstractPiece;
  column: number;
  row: number;
  direction: 0 | 1 | 2 | 3;
}

const Piece = (props: PieceProps) => {
  if (props.piece instanceof OPiece) {
    return <OPieceComponent {...props} />;
  }

  if (props.piece instanceof IPiece) {
    return <IPieceComponent {...props} orientation={props.piece.orientation} />;
  }

  return null;
};

const pieceStyle = (props: PieceProps): CSSProperties => ({
  gridColumnStart: props.column,
  gridRowStart: props.row,
  backgroundColor: props.piece.color,
});

const OPieceComponent = (props: PieceProps) => {
  return (
    <div className={styles.OPiece} style={pieceStyle(props)}>
      {new Array(4).fill(null).map((_, index) => (
        <div key={index} className={boardStyles.activeCell} />
      ))}
    </div>
  );
};

interface IPieceComponentProps extends PieceProps {
  orientation: 'Horizontal' | 'Vertical';
}

const IPieceComponent = (props: IPieceComponentProps) => (
  <div
    className={
      props.orientation === 'Horizontal'
        ? styles.IPieceHorizontal
        : styles.IPieceVertical
    }
    style={pieceStyle(props)}
  >
    {new Array(4).fill(null).map((_, index) => (
      <div key={index} className={boardStyles.activeCell} />
    ))}
  </div>
);

export default Piece;
