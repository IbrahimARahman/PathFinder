import { useEffect, useState } from "react";
import "./Cell.css";

let styleMap = new Map<number, {}>([
  [0, { backgroundColor: "white" }],
  [1, { backgroundColor: "black" }],
  [2, { backgroundColor: "green" }],
  [3, { backgroundColor: "red" }],
]);

interface CellProps {
  cellT: number;
  isPath?: boolean;
  onClick: () => void;
}

const Cell = ({ cellT, isPath, onClick }: CellProps) => {
  const [cellType, setCellType] = useState(cellT);
  const [styles, setStyles] = useState(styleMap.get(cellType));

  useEffect(() => {
    setStyles(styleMap.get(cellType));
  }, [cellType]);

  const handleClick = () => {
    if (cellType === 2 || cellType === 3) return;
    setCellType(cellType === 0 ? 1 : 0);
    onClick();
  };

  return (
    <div
      className={`cell type-${cellType} ${isPath ? "path" : ""}`}
      onClick={handleClick}
      style={styles}
    ></div>
  );
};

export default Cell;
