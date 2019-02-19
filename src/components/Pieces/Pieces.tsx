import React, { CSSProperties } from 'react';
import * as boardStyles from '../Board.module.scss';
import AbstractPiece from './AbstractPiece';
import IPiece from './IPiece';
import JPiece from './JPiece';
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

  if (props.piece instanceof JPiece) {
    return <JPieceComponent {...props} orientation={props.piece.orientation} />;
  }

  return null;
};

export default Piece;

const pieceStyle = (props: PieceProps): CSSProperties => ({
  gridColumnStart: props.column,
  gridRowStart: props.row,
  // backgroundColor: props.piece.color,
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

interface JPieceComponentProps extends PieceProps {
  orientation: 'Left' | 'Right' | 'Up' | 'Down';
}

const JPieceComponent = (props: JPieceComponentProps) => {
  switch (props.orientation) {
    case 'Down':
      return (
        <div className={styles.JPieceHorizontal} style={pieceStyle(props)}>
          {new Array(3).fill(null).map((_, index) => (
            <div key={index} className={boardStyles.activeCell} />
          ))}
          <div
            className={boardStyles.activeCell}
            style={{
              gridColumn: 3,
            }}
          />
        </div>
      );

    case 'Left':
      return (
        <div className={styles.JPieceVertical} style={pieceStyle(props)}>
          <div
            className={boardStyles.activeCell}
            style={{
              gridColumn: 1,
              gridRow: 3,
            }}
          />
          {new Array(3).fill(null).map((_, index) => (
            <div
              key={index}
              className={boardStyles.activeCell}
              style={{
                gridColumn: 2,
              }}
            />
          ))}
        </div>
      );

    case 'Up':
      return (
        <div className={styles.JPieceHorizontal} style={pieceStyle(props)}>
          <div
            className={boardStyles.activeCell}
            style={{
              gridColumn: 1,
              gridRow: 1,
            }}
          />
          {new Array(3).fill(null).map((_, index) => (
            <div
              key={index}
              className={boardStyles.activeCell}
              style={{
                gridRow: 2,
              }}
            />
          ))}
        </div>
      );

    case 'Right':
      return (
        <div className={styles.JPieceVertical} style={pieceStyle(props)}>
          {new Array(3).fill(null).map((_, index) => (
            <div
              key={index}
              className={boardStyles.activeCell}
              style={{
                gridColumn: 1,
              }}
            />
          ))}
          <div
            className={boardStyles.activeCell}
            style={{
              gridColumn: 2,
              gridRow: 1,
            }}
          />
        </div>
      );

    default:
      throw new Error('Unsupported orientation for JPiece');
  }
};
