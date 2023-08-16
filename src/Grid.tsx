import { useState } from "react";
import { useEffect } from "react";
import "./Grid.css";

const GRID_ROW_LENGTH = 50;
const GRID_COL_LENGTH = 21;
let styleMap = new Map<number, {}>([
  [0, { backgroundColor: "white" }],
  [1, { backgroundColor: "black" }],
  [2, { backgroundColor: "green" }],
  [3, { backgroundColor: "red" }],
]);

interface CellProps {
  cellT: number;
  onClick: () => void;
}

const Cell = ({ cellT, onClick }: CellProps) => {
  const [cellType, setCellType] = useState(cellT);
  const [styles, setStyles] = useState(styleMap.get(cellType));

  useEffect(() => {
    setStyles(styleMap.get(cellType));
  }, [cellType]);

  const handleClick = () => {
    setCellType(cellType === 0 ? 1 : 0);
    onClick();
  };

  return <div className="cell" onClick={handleClick} style={styles}></div>;
};

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
