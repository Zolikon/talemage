import { useState } from "react";
import ImageButton from "./ImageButton";
import PropTypes from "prop-types";
import { useTale } from "./TaleContext";
import NextButton from "./NextButton";

function SelectAudience() {
  const [audience, setAudience] = useState([{ gender: "", age: "" }]);
  const { setAudience: finalizeAudience } = useTale();

  function isConfigured() {
    return audience.length > 0 && audience.every((member) => member.gender && member.age);
  }

  function finishSetup() {
    finalizeAudience(audience.map(({ gender, age }) => `a ${gender} ${age} year old`));
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-[90%] overflow-y-auto custom-scrollbar mb-3">
        {audience.map((audienceMember, index) => (
          <AudienceMember
            key={index}
            gender={audienceMember.gender}
            setGender={(gender) => {
              const newAudience = [...audience];
              newAudience[index].gender = gender;
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
          className="flex items-center justify-center disabled::grayscale disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={audience.length >= 2}
          onClick={() => setAudience([...audience, { gender: "", age: "" }])}
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

function AudienceMember({ gender, setGender, age, setAge, removeSelf }) {
  return (
    <div
      className={`relative flex flex-col xl:flex-row items-center gap-2 xl-gap-12 ${
        age && gender && "bg-green-400"
      } m-2 p-2`}
    >
      <div className="flex gap-2">
        <ImageButton
          size="medium"
          imageSrc="/boy.webp"
          altText="boy"
          onClick={() => {
            setGender("boy");
          }}
          selected={gender === "boy"}
        />

        <ImageButton
          size="medium"
          imageSrc="/girl.webp"
          altText="girl"
          onClick={() => {
            setGender("girl");
          }}
          selected={gender === "girl"}
        />
      </div>

      <div className="flex gap-2 flex-wrap items-center justify-center">
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
        {removeSelf && (
          <button
            onClick={removeSelf}
            className="w-4 h-4 xl:w-8 xl:h-8 self-start bg-red-400 rounded-full p-2 items-center justify-center flex hover:bg-red-600 absolute top-[10px] right-[10px]"
          >
            <span className="material-symbols-outlined text-sm sm:text-xl">close</span>
          </button>
        )}
      </div>
    </div>
  );
}

AudienceMember.propTypes = {
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
  age: PropTypes.string.isRequired,
  setAge: PropTypes.func.isRequired,
  removeSelf: PropTypes.func,
};

export default SelectAudience;
