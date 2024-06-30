import { useState } from "react";
import ImageButton from "./ImageButton";
import { useTale } from "./TaleContext";
import NextButton from "./NextButton";

const languages = ["gb", "us", "es", "gr", "hu"];

const languageNames = {
  gb: "Brittish",
  us: "US English",
  es: "Spanish",
  gr: "Greek",
  hu: "Hungarian",
};

function SelectLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { setLanguage } = useTale();

  return (
    <div className="flex flex-col items-center h-full ">
      <h1 className="text-2xl font-bold">{selectedLanguage ? languageNames[selectedLanguage] : "Select language"}</h1>
      <div className="flex gap-3 my-6 flex-wrap items-center justify-end pr-2 overflow-y-auto">
        {languages.map((l) => (
          <div key={l} className="flex gap-2 items-center justify-end">
            <p className="text-2xl font-bold">{languageNames[l]}</p>
            <ImageButton
              size="big"
              imageSrc={`/flags/${l}.svg`}
              altText={l}
              onClick={() => setSelectedLanguage(l)}
              selected={selectedLanguage === l}
            />
          </div>
        ))}
      </div>
      <NextButton
        beforeNextStatusAction={() => setLanguage(languageNames[selectedLanguage])}
        disabled={!selectedLanguage}
        disabledTooltip="selecte a language"
      />
    </div>
  );
}

export default SelectLanguage;
