import { useState } from "react";
import ImageButton from "./ImageButton";
import { useTale } from "./TaleContext";
import NextButton from "./NextButton";

function SelectGenre() {
  const [genre, setGenre] = useState("Select genre");
  const { setGenre: finalizeGenre } = useTale();

  function finishSetup() {
    finalizeGenre(genre);
  }

  return (
    <div className="flex flex-col items-center  h-full">
      <h1 className="text-2xl font-bold">{genre}</h1>
      <div className="flex my-12 py-12 flex-col sm:flex-row sm:flex-wrap items-center justify-center  custom-scrollbar overflow-x-auto overflow-y-hidden sm:overflow-x-hidden sm:overflow-y-auto">
        <ImageButton
          size="huge"
          imageSrc="/fantasy_genre.webp"
          altText="fantasy"
          onClick={() => {
            setGenre("A fairy tale");
          }}
          selected={genre === "A fairy tale"}
        />
        <ImageButton
          size="huge"
          imageSrc="/animal_genre.webp"
          altText="animals"
          onClick={() => {
            setGenre("Tale about animals");
          }}
          selected={genre === "Tale about animals"}
        />
        <ImageButton
          size="huge"
          imageSrc="/contruction_genre.webp"
          altText="contruction machines"
          onClick={() => {
            setGenre("Tale about contruction machines");
          }}
          selected={genre === "Tale about contruction machines"}
        />
      </div>
      <NextButton
        beforeNextStatusAction={finishSetup}
        disabled={genre === "Select genre"}
        disabledTooltip="Select a genre"
      />
    </div>
  );
}

export default SelectGenre;
