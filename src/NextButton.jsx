import PropTypes from "prop-types";
import { useTale } from "./TaleContext";

function NextButton({ beforeNextStatusAction, disabled = false, disabledTooltip = "" }) {
  const { nextStatus } = useTale();

  function handleClick() {
    beforeNextStatusAction();
    nextStatus();
  }

  return (
    <div className="relative flex justify-center items-center group">
      <button
        onClick={handleClick}
        disabled={disabled}
        className="disabled:grayscale disabled:cursor-not-allowed border-[#ee4208] 
          border-2 sm:border-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#e4c61d] disabled:bg-gray-500 transition duration-500 ease-in-out
          flex items-center justify-center aspect-square size-8 sm:w-16 sm:h-16"
      >
        <img src="/next.svg" />
      </button>
      {disabled && (
        <div className="absolute bottom-full mb-2 hidden group-hover:block">
          <div className="bg-slate-600 text-white text-sm rounded py-2 px-4">{disabledTooltip}</div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2 w-4 h-4 bg-slate-600 rotate-45"></div>
        </div>
      )}
    </div>
  );
}

NextButton.propTypes = {
  beforeNextStatusAction: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  disabledTooltip: PropTypes.string,
};

export default NextButton;
