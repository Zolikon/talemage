import { useEffect } from "react";
import { useTale } from "./TaleContext";
import API_URL from "./environment";

function Tale() {
  const { getFinalState, setTale, nextStatus, setToErrorState, tale, title } = useTale();

  useEffect(() => {
    if (!tale) {
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getFinalState()),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
          return response.json();
        })
        .then((response) => {
          setTale(response.title, response.tale);
        })
        .catch(() => {
          setToErrorState();
        });
    }
  }, [getFinalState, nextStatus, setTale, setToErrorState, tale, title]);

  if (!tale) {
    return (
      <div className="flex flex-col gap-2 h-1/2 w-1/2 items-center justify-center">
        <div className="flex gap-4 justify-center items-center">
          <div className="text-2xl font-semibold">Writing your tale</div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#ce83ce]"></div>
        </div>
        <img src="/writing.webp" alt="writing" className="h-96 w-96" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-4/5 items-center justify-start my-7">
      <div className="text-sm sm:text-3xl font-semibold bg-green-600 p-2 rounded-xl h-[20%] flex items-center justify-center">
        {title}
      </div>
      <div
        className="text-xs sm:text-lg flex flex-col gap-2 items-start justify-start overflow-y-auto my-4 box-border h-[80%] py-4 custom-scrollbar"
        style={{}}
      >
        {tale.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default Tale;
