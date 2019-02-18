import React from 'react';
import * as boardStyles from '../Board.module.scss';
import AbstractPiece from './AbstractPiece';
import * as styles from './Pieces.module.scss';

interface PieceProps {
  piece: AbstractPiece;
}

const Piece = (props: PieceProps) => {
  return <OPieceComponent piece={props.piece} />;
};

const OPieceComponent = (props: PieceProps) => {
  return (
    <div
      className={styles.OPiece}
      style={{
        gridColumnStart: props.piece.position.column,
        gridRowStart: props.piece.position.row,
        backgroundColor: props.piece.color,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
      }}
    >
      {new Array(4).fill(<div className={boardStyles.activeCell} />)}
    </div>
  );
};

export default Piece;
