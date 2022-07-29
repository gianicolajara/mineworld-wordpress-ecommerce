import Input from "../Input";
import PropTypes from "prop-types";

const LoginF = ({ loginForm = {}, handleChange = () => {}, errors = {} }) => {
  return (
    <>
      <Input
        labelText="Username"
        name="username"
        placeholder="Username"
        type="text"
        value={loginForm.username}
        onChange={handleChange}
        error={errors?.username}
      />
      <Input
        labelText="Password"
        name="password"
        placeholder="Password"
        type="password"
        value={loginForm.password}
        onChange={handleChange}
        error={errors?.password}
      />
    </>
  );
};

LoginF.propTypes = {
  loginForm: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default LoginF;
