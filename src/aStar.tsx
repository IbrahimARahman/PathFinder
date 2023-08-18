interface Node {
  x: number;
  y: number;
  f: number;
  g: number;
  h: number;
  parent?: Node;
}

const aStar = (grid: number[][], start: Node, end: Node): Node[] => {
  const openList: Node[] = [start];
  const closedList: Node[] = [];

  const getDistance = (nodeA: Node, nodeB: Node): number => {
    const dx = Math.abs(nodeA.x - nodeB.x);
    const dy = Math.abs(nodeA.y - nodeB.y);
    return dx + dy;
  };

  const getNeighbors = (node: Node): Node[] => {
    const neighbors: Node[] = [];
    const { x, y } = node;

    if (x > 0 && grid[x - 1][y] !== 1) {
      neighbors.push({ x: x - 1, y, f: 0, g: 0, h: 0 });
    }
    if (x < grid.length - 1 && grid[x + 1][y] !== 1) {
      neighbors.push({ x: x + 1, y, f: 0, g: 0, h: 0 });
    }
    if (y > 0 && grid[x][y - 1] !== 1) {
      neighbors.push({ x, y: y - 1, f: 0, g: 0, h: 0 });
    }
    if (y < grid[0].length - 1 && grid[x][y + 1] !== 1) {
      neighbors.push({ x, y: y + 1, f: 0, g: 0, h: 0 });
    }

    return neighbors;
  };

  while (openList.length > 0) {
    let currentNode = openList[0];
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < currentNode.f) {
        currentNode = openList[i];
      }
    }

    openList.splice(openList.indexOf(currentNode), 1);
    closedList.push(currentNode);

    if (currentNode.x === end.x && currentNode.y === end.y) {
      const path: Node[] = [];
      let current: Node | undefined = currentNode;
      while (current) {
        path.unshift(current);
        current = current.parent;
      }
      path.shift();
      path.pop();
      return path;
    }

    const neighbors = getNeighbors(currentNode);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (
        closedList.find(
          (node) => node.x === neighbor.x && node.y === neighbor.y
        )
      ) {
        continue;
      }

      const gScore = currentNode.g + getDistance(currentNode, neighbor);
      const hScore = getDistance(neighbor, end);
      const fScore = gScore + hScore;

      let neighborInOpenList = false;
      for (let j = 0; j < openList.length; j++) {
        const openNode = openList[j];
        if (openNode.x === neighbor.x && openNode.y === neighbor.y) {
          neighborInOpenList = true;
          if (gScore < openNode.g) {
            openNode.g = gScore;
            openNode.f = fScore;
            openNode.parent = currentNode;
          }
          break;
        }
      }

      if (!neighborInOpenList) {
        openList.push({
          x: neighbor.x,
          y: neighbor.y,
          f: fScore,
          g: gScore,
          h: hScore,
          parent: currentNode,
        });
      }
    }
  }

  return [];
};

export type { Node };
export default aStar;
