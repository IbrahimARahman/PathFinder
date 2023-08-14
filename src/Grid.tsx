import { useState } from "react";
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
  cellType: number;
  onClick: () => void;
}
const Cell = ({ cellType, onClick }: CellProps) => {
  const [styles, setStyles] = useState(styleMap.get(cellType));

  return (
    <div
      className="cell"
      onClick={() => {
        onClick();
        if (cellType == 0) {
          cellType = 1;
          setStyles(styleMap.get(cellType));
        } else if (cellType == 1) {
          cellType = 0;
          setStyles(styleMap.get(cellType));
        }
      }}
      style={styles}
    ></div>
  );
};

interface GridProps {
  className: string;
}

const Grid = ({ className }: GridProps) => {
  let grid: number[][] = [];
  for (let i = 0; i < GRID_COL_LENGTH; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_ROW_LENGTH; j++) {
      grid[i][j] = 0;
    }
  }
  grid[10][5] = 2;
  grid[10][45] = 3;

  let count = 0;
  return (
    <div className={className}>
      {grid.map((row, rowNum) => {
        return (
          <div className="row" key={rowNum}>
            {row.map((cellType, cellNum) => (
              <Cell
                key={count++}
                cellType={cellType}
                onClick={() => {
                  if (cellType == 0) grid[rowNum][cellNum] = 1;
                  else if (cellType == 1) grid[rowNum][cellNum] = 0;
                }}
              ></Cell>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
