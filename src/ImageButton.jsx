import PropTypes from "prop-types";

function resolveSize(size) {
  switch (size) {
    case "huge":
      return "size-48 md:size-64 2xl:size-96";
    case "big":
      return "size-24 md:size-32 2xl:size-64";
    case "medium":
      return "size-12 md:size-24 2xl:size-32";
    case "small":
      return "size-9 md:size-12 2xl:size-24";
    default:
      return "size-24 md:size-32 2xl:size-64";
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
      <img src={imageSrc} alt={altText} className="absolute top-0 left-0 w-full h-full object-contain" />
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
