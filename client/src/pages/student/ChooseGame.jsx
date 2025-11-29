import { Link } from "react-router-dom";

export default function ChooseGame() {
  return (
    <div className="grid grid-cols-2 gap-6">
  <a
    href="/game/puzzle/unity.html"
    class="p-4 border border-gray-200 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] block"
  >
    <img
      src="/thumb/animalparty.jpg"
      alt="Puzzle Game Thumbnail"
      class="w-full h-48 object-cover rounded-lg"
    />
    <p className="text-center mt-2 font-semibold text-lg text-gray-800">
      Puzzle
    </p>
  </a>

  <a
    href="/game/flappy/flappy.html"
    class="p-4 border border-gray-200 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] block"
  >
    <img
      src="/thumb/flappy.jpg"
      alt="Snake Game Thumbnail"
      class="w-full h-48 object-cover rounded-lg"
    />
    <p className="text-center mt-2 font-semibold text-lg text-gray-800">
      flappy
    </p>
  </a>
</div>
  );
}
