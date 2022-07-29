import Link from "next/link";
import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { motion } from "framer-motion";
import SubMenuItem from "./SubMenuItem";

const MenuItem = ({ item, time, setOpenMenu }) => {
  const [subMenuActivate, setSubMenuActivate] = useState(false);

  const handleHover = () => {
    setSubMenuActivate(true);
  };

  const handleLeave = () => {
    setSubMenuActivate(false);
  };

  const handleToggleSubMenu = (e) => {
    e.stopPropagation();
    setSubMenuActivate(!subMenuActivate);
  };

  const handleClick = () => {
    setOpenMenu(false);
  };

  return (
    <motion.li
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleToggleSubMenu}
      className="cursor-pointer p-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: time * 0.1 }}
    >
      <div className="flex items-center justify-center gap-1 hover:text-green-400 transition-all">
        {item.link ? (
          <Link href={item.link}>
            <a className="font-bold" onClick={handleClick}>
              {item.title}
            </a>
          </Link>
        ) : (
          <span className="font-bold">{item.title}</span>
        )}
        {item.subMenu && <AiOutlineDown size={13} />}
      </div>
      {subMenuActivate && item.subMenu && (
        <SubMenuItem item={item} handleClick={handleClick} />
      )}
    </motion.li>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired,
  setOpenMenu: PropTypes.func.isRequired,
};

export default MenuItem;
