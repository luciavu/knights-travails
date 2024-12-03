// Iterative BFS solution using queue
export default function knightMoves([startX, startY], [destX, destY]) {
  let pathQueue = [{ pos: [startX, startY], path: [[startX, startY]] }];
  let visited = new Set();
  visited.add(`${startX}, ${startY}`);

  const moves = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
  ];

  while (pathQueue.length > 0) {
    const { pos, path } = pathQueue.shift();
    const [currX, currY] = pos;

    if (currX == destX && currY === destY) {
      return path;
    }

    moves.forEach(([x, y]) => {
      const newPos = [currX + x, currY + y];
      const newPosKey = newPos.join(',');

      if (!visited.has(newPosKey)) {
        visited.add(newPosKey);
        pathQueue.push({ pos: newPos, path: [...path, newPos] });
      }
    });
  }
  return 'No paths found'; // Shouldn't reach here
}
