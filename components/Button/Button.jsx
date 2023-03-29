const Button = ({ btnName, handleClick }) => {
  return (
    <div>
      <button
        className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md"
        onClick={handleClick}
      >
        {btnName}
      </button>
    </div>
  );
};

export default Button;
