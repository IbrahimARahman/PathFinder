import { useState } from "react";
import Cell from "./Cell";
import "./Grid.css";
import aStar from "./aStar";

const GRID_ROW_LENGTH = 50;
const GRID_COL_LENGTH = 21;

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
      newGrid[row][col] = prevGrid[row][col] === 0 ? 1 : 0;

      return newGrid;
    });
  };
  //TODO: make sure old path is cleared
  const handleRecalculatePath = () => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const startNode = { x: 10, y: 5, f: 0, g: 0, h: 0 };
      const endNode = { x: 10, y: 45, f: 0, g: 0, h: 0 };
      const path = aStar(newGrid, startNode, endNode);
      // Highlight the shortest path
      for (let i = 0; i < path.length; i++) {
        const node = path[i];
        newGrid[node.x][node.y] = 4;
      }
      return newGrid;
    });
  };

  return (
    <>
      <button onClick={handleRecalculatePath}>Recalculate Path</button>
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
