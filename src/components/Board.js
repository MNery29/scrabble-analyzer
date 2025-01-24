import React from "react";
import "./Board.css";
import { useDroppable } from "@dnd-kit/core";

const specialTiles = {
  doubleWord: [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [10, 10],
    [11, 11],
    [12, 12],
    [13, 13],
    [1, 13],
    [2, 12],
    [3, 11],
    [4, 10],
    [10, 4],
    [11, 3],
    [12, 2],
    [13, 1],
  ],
  tripleWord: [
    [0, 0],
    [0, 7],
    [0, 14],
    [14, 0],
    [14, 7],
    [14, 14],
  ],
  doubleLetter: [
    [0, 3],
    [0, 11],
    [2, 6],
    [2, 8],
    [3, 0],
    [3, 7],
    [3, 14],
    [6, 2],
    [6, 6],
    [6, 8],
    [6, 12],
    [7, 3],
    [7, 11],
    [8, 2],
    [8, 6],
    [8, 8],
    [8, 12],
    [11, 0],
    [11, 7],
    [11, 14],
    [12, 6],
    [12, 8],
    [14, 3],
    [14, 11],
  ],
  tripleLetter: [
    [1, 5],
    [1, 9],
    [5, 1],
    [5, 5],
    [5, 9],
    [5, 13],
    [9, 1],
    [9, 5],
    [9, 9],
    [9, 13],
    [13, 5],
    [13, 9],
  ],
  center: [[7, 7]],
};

const getTileClass = (row, col) => {
  if (specialTiles.doubleWord.some(([r, c]) => r === row && c === col))
    return "double-word";
  if (specialTiles.tripleWord.some(([r, c]) => r === row && c === col))
    return "triple-word";
  if (specialTiles.doubleLetter.some(([r, c]) => r === row && c === col))
    return "double-letter";
  if (specialTiles.tripleLetter.some(([r, c]) => r === row && c === col))
    return "triple-letter";
  if (specialTiles.center.some(([r, c]) => r === row && c === col))
    return "center";
  return "normal";
};

const Board = ({ boardState, onTileDrop }) => {
  const rows = Array.from({ length: 15 }, (_, rowIndex) =>
    Array.from({ length: 15 }, (_, colIndex) => ({ rowIndex, colIndex }))
  );

  const DroppableTile = ({ rowIndex, colIndex }) => {
    const { isOver, setNodeRef } = useDroppable({
      id: `board-${rowIndex}-${colIndex}`,
    });
  
    // Get the tile class based on special tile logic
    const tileClass = getTileClass(rowIndex, colIndex);
  
    return (
      <div
        ref={setNodeRef}
        className={`tile ${tileClass} ${isOver ? "drag-over" : ""}`}
        onDrop={() => onTileDrop(rowIndex, colIndex)}
      >
        {/* Tile placeholder for special tiles */}
        <div className="tile-placeholder">
          {(tileClass === "triple-word" && "TW") ||
            (tileClass === "double-word" && "DW") ||
            (tileClass === "triple-letter" && "TL") ||
            (tileClass === "double-letter" && "DL")}
        </div>
  
        {/* Render the tile letter if the spot is occupied */}
        {boardState[rowIndex][colIndex] && (
          <div className="tile-letter">{boardState[rowIndex][colIndex]}</div>
        )}
      </div>
    );
  };
  return (
    <div className="board">
      {rows.map((row, rowIndex) =>
        row.map(({ rowIndex, colIndex }) => (
          <DroppableTile
            key={`tile-${rowIndex}-${colIndex}`}
            rowIndex={rowIndex}
            colIndex={colIndex}
          />
        ))
      )}
    </div>
  );
};

export default Board;
