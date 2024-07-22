import { useTale } from "./TaleContext";

function HomeButton() {
  const { reset } = useTale();
  return (
    <button
      onClick={reset}
      className=" bg-purple-600 text-stone-300 rounded-full size-8 sm:size-16 absolute bottom-[30px] right-[30px] opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300
    flex items-center justify-center"
    >
      <span className="material-symbols-outlined text-lg sm:text-2xl">home</span>
    </button>
  );
}

export default HomeButton;
