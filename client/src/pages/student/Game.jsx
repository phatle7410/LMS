import React from "react";

const Game = () => {
  return (
    <div className="w-full flex justify-center">
      <iframe
        src="/game/unity.html"
        style={{ border: "none", width: "100%", height: "100vh" }}
        title="Unity WebGL Game"
      />
    </div>
  );
};

export default Game;
