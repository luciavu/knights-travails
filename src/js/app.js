// Iterative BFS solution using queue
export function knightMoves([startX, startY], [destX, destY]) {
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
  const isValid = ([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8;

  while (pathQueue.length > 0) {
    const { pos, path } = pathQueue.shift();
    const [currX, currY] = pos;

    if (currX == destX && currY === destY) return convertToChessCoordinates(path);

    moves.forEach(([x, y]) => {
      const newPos = [currX + x, currY + y];
      const newPosKey = newPos.join(',');

      if (isValid(newPos) && !visited.has(newPosKey)) {
        visited.add(newPosKey);
        pathQueue.push({ pos: newPos, path: [...path, newPos] });
      }
    });
  }
  return 'No paths found'; // Shouldn't reach here
}

// 'a1' -> [0,0]
export function convertToCoordinates(node) {
  return [node[0].toLowerCase().charCodeAt(0) - 97, node[1] - 1];
}

// [0,0] -> 'a1'
const convertToChessCoordinates = (paths) => {
  const convertedPath = [];
  paths.forEach((path) => {
    convertedPath.push(`${String.fromCharCode(97 + path[0])}${path[1] + 1}`);
  });
  return convertedPath;
};
