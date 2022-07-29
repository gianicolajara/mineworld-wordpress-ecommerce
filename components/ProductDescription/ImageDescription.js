import { motion } from "framer-motion";
import Image from "next/image";
import PropTypes from "prop-types";

const ImageDescription = ({ image = "", alt = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative w-full flex justify-center"
    >
      <Image
        src={image}
        alt={alt || ""}
        title={alt || ""}
        width={400}
        height={400}
      />
    </motion.div>
  );
};

ImageDescription.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default ImageDescription;
