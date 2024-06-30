import { useTale } from "./TaleContext";

function HomeButton() {
  const { reset } = useTale();
  return (
    <button
      onClick={reset}
      className=" bg-purple-600 text-stone-300 rounded-full w-16 h-16 absolute bottom-4 right-4 opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300
    flex items-center justify-center"
    >
      <span className="material-symbols-outlined text-2xl">home</span>
    </button>
  );
}

export default HomeButton;
