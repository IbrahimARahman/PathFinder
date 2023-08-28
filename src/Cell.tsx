import { useEffect, useState } from "react";
import "./Cell.css";

let styleMap = new Map<number, {}>([
  [0, { backgroundColor: "white" }],
  [1, { backgroundColor: "black" }],
  [2, { backgroundColor: "green" }],
  [3, { backgroundColor: "red" }],
  [4, { backgroundColor: "yellow" }],
  [5, { backgroundColor: "lightblue" }],
]);

interface CellProps {
  cellT: number;
  onClick: () => void;
}

const Cell = ({ cellT, onClick }: CellProps) => {
  const [cellType, setCellType] = useState(cellT);
  const [styles, setStyles] = useState(styleMap.get(cellType));

  useEffect(() => {
    setCellType(cellT);
  }, [cellT]);

  useEffect(() => {
    setStyles(styleMap.get(cellType));
  }, [cellType]);

  const handleClick = () => {
    if (cellType === 2 || cellType === 3) return;
    onClick();
  };

  return (
    <div
      className={`cell type-${cellType}`}
      onClick={handleClick}
      style={styles}
    ></div>
  );
};

export default Cell;
