import { useParams } from "react-router-dom";

const Game = () => {
  const { name } = useParams();

  return (
    <iframe
      src={`/game/${name}/unity.html`}
      style={{ border: "none", width: "100%", height: "100vh" }}
      title="Unity WebGL Game"
    />
  );
};

export default Game;
