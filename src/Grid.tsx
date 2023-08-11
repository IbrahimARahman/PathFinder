import "./Grid.css";
//import { useState } from "react";

const GRID_ROW_LENGTH = 50;
const GRID_COL_LENGTH = 20;

interface CellProps {
  innerText: string;
}
const Cell = ({ innerText }: CellProps) => {
  return <div className="cell">{innerText}</div>;
};

const Grid = () => {
  const grid = [];
  let count = 0;
  for (let i = 0; i < GRID_COL_LENGTH; i++) {
    const row = [];
    for (let j = 0; j < GRID_ROW_LENGTH; j++) {
      row.push(count++);
    }
    grid.push(row);
  }
  return (
    <div>
      {grid.map((row) => {
        return (
          <div className="row">
            {row.map((j) => (
              <Cell innerText={String(j)}></Cell>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
