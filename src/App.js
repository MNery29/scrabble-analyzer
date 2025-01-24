import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import TileSource from "./components/TileSource";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [boardState, setBoardState] = useState(
    Array.from({ length: 15 }, () => Array(15).fill(null))
  );

  const onTileDrop = (rowIndex, colIndex) => {
    // Handle the drop logic here
    console.log(`Tile dropped at [${rowIndex}, ${colIndex}]`);
    // Update board state (this will need to change based on your tile management)
  };

  return (
    <DndContext onDragEnd={onTileDrop}>
      <div className="App">
        <header className="App-header">
          <h1>Unscrabbled</h1>
          <h2>For finding those words you might've missed!</h2>
          <h3>Drag tiles to the board, then click Analyze to see the best words!</h3>
          <Board boardState={boardState} onTileDrop={onTileDrop} />
          <TileSource />
        </header>
      </div>
    </DndContext>
  );
}

export default App;
