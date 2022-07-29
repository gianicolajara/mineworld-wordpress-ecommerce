import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Icon = ({ children, time = 0, onClick = () => {} }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: time * 0.1 + 0.5 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

Icon.propTypes = {
  children: PropTypes.node.isRequired,
  time: PropTypes.number,
  onClick: PropTypes.func,
};

export default Icon;
