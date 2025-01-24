import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./Board.css";

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

const Board = ({ boardState }) => {
  const grid = Array.from({ length: 15 }, (_, row) =>
    Array.from({ length: 15 }, (_, col) => ({ row, col }))
  );

  return (
    <div className="board">
      {grid.map((row, rowIndex) =>
        row.map(({ row, col }) => {
          const tile = boardState[row][col]; // Get tile from boardState
          const tileClass = getTileClass(row, col);
          const droppableId = `board-${row}-${col}`;

          return (
            <Droppable key={droppableId} droppableId={droppableId}>
              {(provided, snapshot) => (
                <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`tile ${tileClass} ${
                  snapshot.isDraggingOver ? "drag-over" : ""
                }`}
              >
                {tile ? (
                  // If a tile exists, make it draggable
                  <Draggable draggableId={`tile-${row}-${col}`} index={0}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="draggable-tile"
                      >
                        {tile}
                      </div>
                    )}
                  </Draggable>
                ) : (
                  // If no tile, show special tile indicators
                  (tileClass === "triple-word" && "TW") ||
                  (tileClass === "double-word" && "DW") ||
                  (tileClass === "triple-letter" && "TL") ||
                  (tileClass === "double-letter" && "DL") ||
                  ""
                )}
                {provided.placeholder}
              </div>
              )}
            </Droppable>
          );
        })
      )}
    </div>
  );
};

export default Board;


