import SelectAudience from "./SelectAudience";
import SelectContent from "./SelectContent";
import SelectGenre from "./SelectGenre";
import SelectLanguage from "./SelectLanguage";
import { useTale } from "./TaleContext";

const STATUS_MAPPING = {
  SELECT_GENRE: <SelectGenre />,
  SELECT_AUDIENCE: <SelectAudience />,
  SELECT_CONTENT: <SelectContent />,
  SELECT_LANGUAGE: <SelectLanguage />,
};

function TaleCreator() {
  const { getStatus } = useTale();

  return <div className="h-4/5 w-4/5 flex items-center justify-center">{STATUS_MAPPING[getStatus()]}</div>;
}

export default TaleCreator;
