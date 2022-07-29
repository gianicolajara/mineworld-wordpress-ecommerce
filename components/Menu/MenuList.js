import { itemMenu } from "../../config/menuConfig";
import MenuItem from "./MenuItem";

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { DeviceContext } from "../../contexts/devices.context";
import { mobile } from "../../config/devices";
import PropTypes from "prop-types";

const variantsMobile = {
  open: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      duration: 0.5,
    },
  },
  close: {
    opacity: 0,
    y: -450,
    height: 0,
    transition: {
      duration: 0.5,
    },
  },
};
const variantsDesktop = {
  open: {
    opacity: 1,
    y: 0,
    height: "initial",
  },
  close: {
    opacity: 1,
    y: 0,
    height: "initial",
  },
};

const menuVariantsMobile = {
  open: {
    height: "auto",
  },
  close: {
    height: 0,
  },
};

const menuVariantsDesktop = {
  open: {
    height: "initial",
  },
  close: {
    height: "initial",
  },
};

const MenuList = ({ openMenu, setOpenMenu }) => {
  const { device } = useContext(DeviceContext);

  return (
    <motion.div
      initial={false}
      animate={openMenu ? "open" : "close"}
      variants={mobile(device) ? menuVariantsMobile : menuVariantsDesktop}
      className="w-full h-full bg-white"
    >
      <motion.ul
        initial={false}
        animate={openMenu ? "open" : "close"}
        variants={mobile(device) ? variantsMobile : variantsDesktop}
        className="w-full h-full lg:flex gap-4 justify-center items-center"
      >
        {itemMenu.map((item, index) => (
          <MenuItem
            key={item.key}
            item={item}
            time={index}
            setOpenMenu={setOpenMenu}
          />
        ))}
      </motion.ul>
    </motion.div>
  );
};

MenuList.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  setOpenMenu: PropTypes.func.isRequired,
};

export default MenuList;
