import { useRef } from "react";
import Error from "./Error";
import HomeButton from "./HomeButton";
import Tale from "./Tale";
import { useTale } from "./TaleContext";
import TaleCreator from "./TaleCreator";

function App() {
  const { getStatus, nextStatus, reset } = useTale();
  const dialogRef = useRef(null);

  function componentToDisplay() {
    switch (getStatus()) {
      case "NOT_STARTED":
        return (
          <div className="flex flex-col gap-2 items-center">
            <img src="/bedtime_story.webp" className=" h-1/2 w-1/2 md:h-1/3 md:w-1/3" />
            <button
              className=" opacity-80  w-1/2 h-1/2 md:h-1/4 md:w-1/2 bg-[#e4c61d]  rounded-lg shadow-md hover:shadow-2xl hover:opacity-100 transition-all duration-300 flex items-center justify-center"
              onClick={nextStatus}
            >
              <img src="/new_story.svg" className="" />
            </button>
          </div>
        );
      case "GENERATING":
      case "COMPLETED":
        return <Tale />;
      case "ERROR":
        return <Error />;
      default:
        return <TaleCreator />;
    }
  }

  return (
    <>
      <main className=" w-full h-full flex flex-col justify-between">
        <header className="bg-gradient-to-r from-[#ce83ce] to-[#e4c61d] text-white p-2 h-[10%] flex items-center justify-center">
          <div className="flex gap-2 cursor-pointer h-full items-center" onClick={reset}>
            <img src="/icon.webp" className="h-4/5" />
            <img src={"/logo.svg"} className="h-4/5" onClick={reset} />
          </div>
        </header>
        <section className="flex justify-center items-center bg-[#95d7eb] p-2 flex-grow h-4/5 relative">
          {componentToDisplay()}
          <HomeButton />
        </section>
        <footer className="bg-gradient-to-r from-[#ce83ce] to-[#e4c61d] text-stone-600 p-2 h-[4%] flex justify-end items-center">
          <button onClick={() => dialogRef.current.showModal()}>About us</button>
          <p className="text-center px-5 select-none">TailMage | 2024</p>
        </footer>
      </main>
      <dialog ref={dialogRef}>
        <div className="flex flex-col h-[50vh] w-[50vw] m-4 items-center justify-start">
          <img src="/logo.svg" className="h-32" />
          <div className="flex-grow font-semibold">
            <p className="py-1">
              This is an AI supported tale generator. Highly configurable to bring a new adventure every night.
            </p>
            <p className="py-1">
              We are very careful about how we are generating stories but AI solutions are not bulletproof. This is just
              how they work. So parental review of the story is necessary.
            </p>
          </div>
          <button onClick={() => dialogRef.current.close()} className="bg-green-600 p-2 rounded-md text-stone-200">
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

export default App;
