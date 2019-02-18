import React from 'react';
import Board from './Board';
import * as styles from './Tetris.module.scss';

const Tetris = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Tetris</h1>
    <Board width={10} height={20} />
  </div>
);

export default Tetris;
