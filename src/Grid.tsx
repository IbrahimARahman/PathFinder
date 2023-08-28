import { useState } from "react";
import Cell from "./Cell";
import "./Grid.css";

const GRID_ROW_LENGTH = 50;
const GRID_COL_LENGTH = 21;

interface Node {
  x: number;
  y: number;
  f: number;
  g: number;
  h: number;
  parent?: Node;
}

interface GridProps {
  className: string;
}

const Grid = ({ className }: GridProps) => {
  const [grid, setGrid] = useState(() => {
    const newGrid = Array.from({ length: GRID_COL_LENGTH }, () =>
      Array.from({ length: GRID_ROW_LENGTH }, () => 0)
    );
    newGrid[10][5] = 2;
    newGrid[10][45] = 3;
    return newGrid;
  });

  const handleCellClick = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row][col] =
        prevGrid[row][col] === 0 || prevGrid[row][col] === 4 ? 1 : 0;

      return newGrid;
    });
  };

  const handleRecalculatePath = () => {
    setGrid((prevGrid) => {
      const startNode = { x: 10, y: 5, f: 0, g: 0, h: 0 };
      const endNode = { x: 10, y: 45, f: 0, g: 0, h: 0 };
      const path = aStar(prevGrid, startNode, endNode);
      const newGrid = prevGrid.map((row) =>
        row.map((cell) => (cell === 4 ? 0 : cell))
      );
      // Highlight the shortest path
      for (let i = 0; i < path.length; i++) {
        const node = path[i];
        newGrid[node.x][node.y] = 4;
      }
      return newGrid;
    });
  };

  const handleReset = () => {
    setGrid(() => {
      const newGrid = Array.from({ length: GRID_COL_LENGTH }, () =>
        Array.from({ length: GRID_ROW_LENGTH }, () => 0)
      );
      newGrid[10][5] = 2;
      newGrid[10][45] = 3;
      return newGrid;
    });
  };

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
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        if (newGrid[x][y] != 2 && newGrid[x][y] != 3) newGrid[x][y] = 5;
        return newGrid;
      });

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

  return (
    <>
      <button onClick={handleRecalculatePath}>Recalculate Path</button>
      <button onClick={handleReset}>Reset</button>
      <div className={className}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cellType, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                cellT={cellType}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
