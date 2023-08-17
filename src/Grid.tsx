import { useState } from "react";
import Cell from "./Cell";
import "./Grid.css";

const GRID_ROW_LENGTH = 50;
const GRID_COL_LENGTH = 21;

interface GridProps {
  className: string;
  isStarted: boolean;
}

const Grid = ({ className, isStarted }: GridProps) => {
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

  return (
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
  );
};

export default Grid;
