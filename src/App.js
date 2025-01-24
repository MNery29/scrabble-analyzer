
import './App.css';
import React, { useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import Board from './components/Board';
import Hand from './components/Hand';
import TileSource from './components/TileSource';


function App() {
  const [handTiles, setHandTiles] = useState([]);
  const [boardState, setBoardState] = useState(
    Array.from({ length: 15 }, () => Array(15).fill(null)) // 15x15 board initialized to null
  );

  const addTileToHand = (tile) => {
    // Ensure the hand can only hold up to 7 tiles
    if (handTiles.length < 7) {
      setHandTiles((prev) => [...prev, tile]);
    }
  };

  const onClearHand = () => {
    setHandTiles([]); // Clear the hand by resetting it to an empty array
    setBoardState(Array(15).fill(null).map(() => Array(15).fill(null))); // Clear the board
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
  
    // If there is no destination, do nothing
    if (!destination) return;
  
    // If the source and destination are the same, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    // If dragging from the hand to the board
    if (source.droppableId === "hand" && destination.droppableId.startsWith("board-")) {
      const [row, col] = destination.droppableId.split("-").slice(1).map(Number);
  
      setBoardState((prevState) => {
        const newBoardState = [...prevState];
        newBoardState[row][col] = draggableId; // Place the tile on the board
        return newBoardState;
      });
  
      setHandTiles((prevHand) => prevHand.filter((tile) => tile !== draggableId)); // Remove the tile from the hand
    }
  
    // If dragging between board tiles
    if (source.droppableId.startsWith("board-") && destination.droppableId.startsWith("board-")) {
      const [sourceRow, sourceCol] = source.droppableId.split("-").slice(1).map(Number);
      const [destRow, destCol] = destination.droppableId.split("-").slice(1).map(Number);
  
      setBoardState((prevState) => {
        const newBoardState = [...prevState];
        newBoardState[destRow][destCol] = newBoardState[sourceRow][sourceCol];
        newBoardState[sourceRow][sourceCol] = null; // Clear the source tile
        return newBoardState;
      });
    }
  
    // If dragging from the board back to the hand
    if (source.droppableId.startsWith("board-") && destination.droppableId === "hand") {
      const [row, col] = source.droppableId.split("-").slice(1).map(Number);
  
      setHandTiles((prevHand) => [...prevHand, boardState[row][col]]); // Add the tile to the hand
  
      setBoardState((prevState) => {
        const newBoardState = [...prevState];
        newBoardState[row][col] = null; // Clear the tile from the board
        return newBoardState;
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <header className="App-header">
          <h1>Unscrabbled</h1>
          <h2>For finding those words you might've missed!</h2>
          <h3>Drag tiles to your hand and the board, then click Analyze to see the best words!</h3>
          <Board boardState={boardState} />
          <Hand tiles={handTiles} onClearHand={onClearHand} />
          <TileSource onTileDrag={addTileToHand} />
        </header>
      </div>
    </DragDropContext>
  );
}

export default App;