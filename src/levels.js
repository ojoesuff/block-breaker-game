import Brick from "/src/brick";

export function buildLevel(game, level) {
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 60 * brickIndex,
          y: 150 + 23 * rowIndex
        };

        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}

export const level1 = [
  [0, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1]
];
