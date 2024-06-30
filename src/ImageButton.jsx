import PropTypes from "prop-types";

function resolveSize(size) {
  switch (size) {
    case "huge":
      return "h-60 w-60 lg:h-96 lg:w-96";
    case "big":
      return "h-32 w-32 lg:h-64 lg:w-64";
    case "medium":
      return "h-16 w-16 lg:h-32 lg:w-32";
    default:
      return "h-32 w-32 lg:h-64 lg:w-64";
  }
}

const ImageButton = ({ imageSrc, altText, onClick, size = "big", selected = false }) => {
  return (
    <button
      className={`${resolveSize(size)} m-2 relative overflow-hidden
      ${
        selected ? " border-green-600  border-[12px]" : "border-gray-200 border-2 grayscale"
      } bg-transparent cursor-pointer shadow-lg 
      transform transition duration-500 hover:scale-105 hover:shadow-xl`}
      onClick={onClick}
    >
      <img src={imageSrc} alt={altText} className="absolute top-0 left-0 w-full h-full object-fill" />
    </button>
  );
};

ImageButton.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  selected: PropTypes.bool,
};

export default ImageButton;
