import { motion } from "framer-motion";
import Button from "../Button";
import Icon from "../Icon";
import Subtitle from "../Subtitle";
import { AiOutlineShoppingCart } from "react-icons/ai";
import PropTypes from "prop-types";

const BodyDescription = ({
  name = "",
  description = "",
  price = "",
  handleAddCart = () => {},
  loading = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col gap-3 items-center lg:items-start"
    >
      <Subtitle>{name}</Subtitle>
      <div
        className="list-disc"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div className=" flex gap-3 flex-wrap">
        <Button loading={loading}>Comprar por {price}</Button>
        <Button onClick={handleAddCart} loading={loading}>
          <Icon>
            <AiOutlineShoppingCart size={20} />
          </Icon>
        </Button>
      </div>
    </motion.div>
  );
};

BodyDescription.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  handleAddCart: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default BodyDescription;
