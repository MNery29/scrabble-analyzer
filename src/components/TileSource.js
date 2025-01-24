import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { tilePool } from "./TilePool";
import "./TileSource.css";

const TileSource = ({ onTileDrag }) => {
  const pool = tilePool || [];

  // Create an array of tiles for display
  const tiles = pool.flatMap((tile) =>
    Array(tile.letter).fill({ id: tile.letter + tile.points, letter: tile.letter, points: tile.points })
  );

  const row1 = tiles.slice(0, 14);
  const row2 = tiles.slice(14, 27);

  // Draggable component with dnd-kit
  const DraggableTile = ({ tile }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: tile.id,
    });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={`tile-pool ${isDragging ? "dragging" : ""}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <span className="tile-letter">{tile.letter}</span>
        <span className="tile-points">{tile.points}</span>
      </div>
    );
  };

  return (
    <div className="tile-source">
      <div className="tile-row">
        {row1.map((tile) => (
          <DraggableTile key={tile.id} tile={tile} />
        ))}
      </div>
      <div className="tile-row">
        {row2.map((tile) => (
          <DraggableTile key={tile.id} tile={tile} />
        ))}
      </div>
    </div>
  );
};

export default TileSource;
