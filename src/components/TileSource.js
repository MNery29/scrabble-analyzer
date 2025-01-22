import React from "react";
import "./TileSource.css";
import { tilePool } from "./TilePool";

const TileSource = () => {
   const pool = tilePool || [];

   //individual tile array
   const tiles = pool.flatMap((tile) => Array(tile.letter).fill(tile));

   const row1 = tiles.slice(0, 14);
   const row2 = tiles.slice(14, 27);

   return (
      <div className="tile-source">
         <div className="tile-row">
            {row1.map((tile, index) => (
               <div key={index} className="tile-pool">
                  <span className="tile-letter">{tile.letter}</span>
                  <span className="tile-points">{tile.points}</span>
               </div>
            ))}
         </div>
         <div className="tile-row">
            {row2.map((tile, index) => (
               <div key={index} className="tile-pool">
                  <span className="tile-letter">{tile.letter}</span>
                  <span className="tile-points">{tile.points}</span>
               
               </div>
            ))}
         </div>
      </div>
   );


}

export default TileSource;