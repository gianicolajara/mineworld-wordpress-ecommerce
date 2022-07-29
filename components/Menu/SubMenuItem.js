import { motion } from "framer-motion";
import Link from "next/link";
import PropTypes from "prop-types";

const SubMenuItem = ({ item, handleClick }) => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute px-7 py-2 bg-black rounded-md transition-all mt-2 translate-x-[-50%] left-[50%] lg:translate-[initial] lg:left-[initial]"
    >
      {item.subMenu &&
        item.subMenu.map((subItem) => (
          <li key={subItem.key} className="py-1" onClick={handleClick}>
            <Link href={subItem.link}>
              <a className="text-white hover:text-green-400 transition-all">
                {subItem.title}
              </a>
            </Link>
          </li>
        ))}
    </motion.ul>
  );
};

SubMenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SubMenuItem;
