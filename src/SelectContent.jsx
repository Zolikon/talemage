import { useState } from "react";
import ImageButton from "./ImageButton";
import { useTale } from "./TaleContext";
import NextButton from "./NextButton";

const topics = {
  "A fairy tale": [
    { value: "demon", description: "Demon" },
    { value: "dragon", label: "Dragon" },
    { value: "female_hero", label: "Female Hero" },
    { value: "female_mage", label: "Female Mage" },
    { value: "hero", label: "Hero" },
    { value: "mage", label: "Mage" },
    { value: "princess", label: "Princess" },
  ],
  "Tale about animals": [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
    { value: "eagle", label: "Eagle" },
    { value: "fox", label: "Fox" },
    { value: "wolf", label: "Wolf" },
  ],
  "Tale about contruction machines": [
    { value: "dump_truck", label: "Dump truck" },
    { value: "excavator", label: "Excavator" },
    { value: "cement_mixer", label: "Cement mixer" },
    { value: "backhoe_loader", label: "Backhoe loader" },
    { value: "tower_crane", label: "Tower crane" },
    { value: "road_roller", label: "Roal roller" },
  ],
};

function SelectContent() {
  const [content, setContent] = useState([]);
  const { getGenre, setContent: finalizeContent } = useTale();

  function toggleTopic(topic) {
    if (content.includes(topic)) {
      removeTopic(topic);
    } else {
      setContent((current) => [...current, topic]);
    }
  }

  function removeTopic(topic) {
    setContent((current) => current.filter((t) => t !== topic));
  }

  return (
    <div className="flex flex-col items-center justify-around">
      <div className="flex flex-wrap my-10 items-center justify-center">
        {topics[getGenre()].map((topic) => (
          <ImageButton
            key={topic.value}
            imageSrc={`/topics/${topic.value}.webp`}
            altText={topic.value}
            onClick={() => toggleTopic(topic.value)}
            selected={content.includes(topic.value)}
          />
        ))}
      </div>
      <NextButton
        disabled={content.length < 2 || content.length > 4}
        beforeNextStatusAction={() => finalizeContent(content)}
        disabledTooltip={content.length < 2 ? "Select more topics" : "Select fewer topics"}
      />
    </div>
  );
}

export default SelectContent;
