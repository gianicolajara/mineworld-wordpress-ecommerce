import PropTypes from "prop-types";

const Input = ({
  label = true,
  labelText = "Label",
  onChange = () => {},
  onClick = () => {},
  value = "",
  type = "text",
  placeholder = "",
  name = "",
  error = null,
}) => {
  const styleErrorInput = error ? "border-red-500 " : "focus:border-blue-600";
  const styleErrorLabel = error ? "text-red-500" : "text-black";

  return (
    <div className="flex flex-col gap-2">
      {label && <p className={styleErrorLabel}>{labelText}:</p>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={`border-[3px] w-full p-2 focus:border-blue-400 outline-none
               rounded-lg ${styleErrorInput}`}
        onChange={onChange}
        onClick={onClick}
        value={value}
      />
      {error && (
        <small className="text-red-400">
          {error?.msg || error?.message || error}
        </small>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.bool,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  required: PropTypes.bool,
};

export default Input;
