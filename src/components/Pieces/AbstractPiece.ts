import Color from './Color';

interface Position {
  column: number;
  row: number;
}

export default abstract class AbstractPiece {
  public color: Color;
  public orientation: 0 | 1 | 2 | 3;
  public position: Position;

  public constructor(color: Color) {
    this.color = color;
    this.orientation = 0;
    this.position = {
      column: 5,
      row: 1,
    };
  }
}
