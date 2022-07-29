import Select from "react-select";
import PropTypes from "prop-types";

const SelectOption = ({
  label = "",
  options = {},
  name = "",
  value = "",
  onChange = () => {},
  error = null,
}) => {
  const labelColor = error ? "text-red-500" : "";

  return (
    <div>
      {label && <p className={labelColor}>{label}</p>}
      <Select
        options={options}
        name={name}
        value={value}
        onChange={onChange}
        instanceId="react-select-27-live-region"
        styles={{
          control: (styles) => ({
            ...styles,
            border: error && "3px solid rgb(220, 38, 38) ",
          }),
        }}
      />
      {error && <small className="text-red-600">{error}</small>}
    </div>
  );
};

SelectOption.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default SelectOption;
