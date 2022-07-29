import Input from "../Input";
import PropTypes from "prop-types";

const RegisterF = ({
  registerForm = {},
  handleChange = () => {},
  errors = {},
}) => {
  return (
    <>
      <Input
        labelText="Username"
        name="username"
        placeholder="Username"
        type="text"
        value={registerForm.username}
        onChange={handleChange}
        error={errors?.username}
      />
      <Input
        labelText="Email"
        name="email"
        placeholder="Email"
        type="text"
        value={registerForm.email}
        onChange={handleChange}
        error={errors?.email}
      />
      <Input
        labelText="Password"
        name="password"
        placeholder="Password"
        type="password"
        value={registerForm.password}
        onChange={handleChange}
        error={errors?.password}
      />
    </>
  );
};

RegisterF.propTypes = {
  registerForm: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default RegisterF;
