import React from "react";
import "./Hand.css";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Hand = ({ tiles, onClearHand }) => {
  const MAX_TILES = 7;
  const placeholders = Array(MAX_TILES - tiles.length).fill(null);

  return (
    <div className="hand-wrapper">
      {/* Hand bar */}
      <Droppable droppableId="hand" direction="horizontal">
        {(provided) => (
          <div
            className="hand-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tiles.map((tile, index) => (
              <Draggable key={tile.id} draggableId={tile.id} index={index}>
                {(provided) => (
                  <div
                    className="hand-tile"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <span className="letter">{tile.letter}</span>
                    <span className="points">{tile.points}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {placeholders.map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="hand-tile-placeholder"
              ></div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Trash button */}
      <button className="clear-hand-button" onClick={onClearHand}>
        Clear
      </button>
    </div>
  );
};

export default Hand;