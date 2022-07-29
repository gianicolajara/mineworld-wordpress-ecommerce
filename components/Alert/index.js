import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

let timeOut = null;

const variants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 100,
  },
};

const Alert = ({
  messages = null,
  type = "success",
  setMessage = () => {},
}) => {
  if (timeOut) {
    clearTimeout(timeOut);
  }

  if (messages) {
    timeOut = setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

  const typesAlerts = {
    success: "bg-green-400 border-2 border-green-600",
    error: "bg-red-400 border-2 border-red-600",
    warning: "bg-yellow-400 border-2 border-yellow-600",
    info: "bg-blue-400 border-2 border-blue-600",
  };

  return (
    <motion.div
      className={`w-full ${typesAlerts[type]} p-3`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {Array.isArray(messages) ? (
        <ul>
          {messages.map((item) => (
            <li
              key={item.message}
              className="text-white font-bold"
              dangerouslySetInnerHTML={{ __html: item.message }}
            ></li>
          ))}
        </ul>
      ) : (
        <p className="text-white font-bold">{messages}</p>
      )}
    </motion.div>
  );
};

Alert.propTypes = {
  messages: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  setMessage: PropTypes.func,
};

export default Alert;
