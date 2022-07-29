import Subtitle from "../Subtitle";
import PropTypes from "prop-types";

const LoginHeader = ({ title = "" }) => {
  return (
    <>
      <Subtitle>{title}</Subtitle>
      <p>
        Porfavor inserte su nombre de usuario dentro del juego y un email valido
      </p>
    </>
  );
};

LoginHeader.propTypes = {
  title: PropTypes.string,
};

export default LoginHeader;
