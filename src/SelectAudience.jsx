import { useState } from "react";
import ImageButton from "./ImageButton";
import PropTypes from "prop-types";
import { useTale } from "./TaleContext";
import NextButton from "./NextButton";

function SelectAudience() {
  const [audience, setAudience] = useState([{ genre: "", age: "" }]);
  const { setAudience: finalizeAudience } = useTale();

  function isConfigured() {
    return audience.length > 0 && audience.every((member) => member.genre && member.age);
  }

  function finishSetup() {
    finalizeAudience(audience.map(({ genre, age }) => `a ${genre} ${age} year old`));
  }

  return (
    <div className="flex flex-col">
      <div>
        {audience.map((audienceMember, index) => (
          <AudienceMember
            key={index}
            genre={audienceMember.genre}
            setGenre={(genre) => {
              const newAudience = [...audience];
              newAudience[index].genre = genre;
              setAudience(newAudience);
            }}
            age={audienceMember.age}
            setAge={(age) => {
              const newAudience = [...audience];
              newAudience[index].age = age;
              setAudience(newAudience);
            }}
            removeSelf={
              index != 0
                ? () => {
                    const newAudience = [...audience];
                    newAudience.splice(index, 1);
                    setAudience(newAudience);
                  }
                : undefined
            }
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <button
          className="flex items-center justify-center disabled::grayscale disabled:opacity-50 cursor-not-allowed"
          disabled={audience.length >= 3}
          onClick={() => setAudience([...audience, { genre: "", age: "" }])}
        >
          <img className="h-10 w-10" src="/+.svg" />
        </button>
        <NextButton
          beforeNextStatusAction={finishSetup}
          disabled={!isConfigured()}
          disabledTooltip="Set up audience first"
        />
      </div>
    </div>
  );
}

function AudienceMember({ genre, setGenre, age, setAge, removeSelf }) {
  return (
    <div className={`flex flex-col items-center gap-2 xl-gap-12 ${age && genre && "bg-green-400"} m-2 p-2`}>
      <div className="flex gap-2">
        <ImageButton
          imageSrc="/boy.webp"
          altText="boy"
          onClick={() => {
            setGenre("boy");
          }}
          selected={genre === "boy"}
        />

        <ImageButton
          imageSrc="/girl.webp"
          altText="girl"
          onClick={() => {
            setGenre("girl");
          }}
          selected={genre === "girl"}
        />
      </div>

      <div className="flex gap-2">
        <ImageButton
          imageSrc="/0-2.svg"
          altText="age 0-2"
          size="medium"
          onClick={() => {
            setAge("0-2");
          }}
          selected={age === "0-2"}
        />
        <ImageButton
          imageSrc="/3-5.svg"
          altText="age 3-5"
          size="medium"
          onClick={() => {
            setAge("3-5");
          }}
          selected={age === "3-5"}
        />
        <ImageButton
          imageSrc="/6-8.svg"
          altText="age 6-8"
          size="medium"
          onClick={() => {
            setAge("6-8");
          }}
          selected={age === "6-8"}
        />
        <ImageButton
          imageSrc="/8+.svg"
          altText="age 8+"
          size="medium"
          onClick={() => {
            setAge("8+");
          }}
          selected={age === "8+"}
        />
      </div>
      {removeSelf ? (
        <button onClick={removeSelf} className="w-4 xl:w-8">
          <img src="/-.svg" />
        </button>
      ) : (
        <div className="w-4 xl:w-8" />
      )}
    </div>
  );
}

AudienceMember.propTypes = {
  genre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
  age: PropTypes.string.isRequired,
  setAge: PropTypes.func.isRequired,
  removeSelf: PropTypes.func,
};

export default SelectAudience;
