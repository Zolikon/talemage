import { useEffect, useState } from "react";
import { useTale } from "./TaleContext";
import PropTypes from "prop-types";
import API_URL from "./environment";

function Tale() {
  const { getFinalState, setTale, nextStatus, setToErrorState, tale, title } = useTale();
  const [fontSize] = useState(16);

  //   function increaseFontSize() {
  //     if (fontSize >= 28) {
  //       return;
  //     }
  //     setFontSize((current) => (current += 4));
  //   }

  //   function decreaseFontSize() {
  //     if (fontSize <= 16) {
  //       return;
  //     }
  //     setFontSize((current) => (current -= 4));
  //   }

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
      <div className="text-[64px] font-semibold bg-green-600 p-2 rounded-xl">{title}</div>
      <div className="flex flex-col gap-2 items-center justify-center overflow-y-auto my-4 box-border" style={{}}>
        <FormattedTale tale={tale} fontSize={fontSize} />
      </div>
    </div>
  );
}

function FormattedTale({ tale, fontSize }) {
  const MAX_LINE_PER_PAGE = 15;
  const taleLines = tale.split("\n");
  const lineNumber = taleLines.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextPage() {
    if (nextPageAvailable()) {
      setCurrentIndex((current) => current + MAX_LINE_PER_PAGE);
    }
  }

  function nextPageAvailable() {
    return currentIndex + MAX_LINE_PER_PAGE < lineNumber;
  }

  function previousPageAvailable() {
    return currentIndex - MAX_LINE_PER_PAGE >= 0;
  }

  function previousPage() {
    if (previousPageAvailable()) {
      setCurrentIndex((current) => current - MAX_LINE_PER_PAGE);
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center h-full">
      <div className="flex gap-2 items-center">
        <button
          onClick={previousPage}
          disabled={!previousPageAvailable()}
          className="disabled:text-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-4xl">arrow_back</span>
        </button>
        <button
          onClick={nextPage}
          disabled={!nextPageAvailable()}
          className="disabled:text-stone-500 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-4xl">arrow_forward</span>
        </button>
        <p className="font-bold px-4">
          {currentIndex / MAX_LINE_PER_PAGE + 1}/{Math.ceil(lineNumber / MAX_LINE_PER_PAGE)}
        </p>
      </div>
      <div className="flex items-center justify-center gap-8">
        <div style={{ fontSize }} className="w-[75%] xl:w-1/2 font-semibold text-xl">
          {taleLines.slice(currentIndex, currentIndex + MAX_LINE_PER_PAGE).map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

FormattedTale.propTypes = {
  tale: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
};

export default Tale;
