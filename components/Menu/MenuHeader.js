import Icon from "../Icon";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { AiOutlineMenu } from "react-icons/ai";
import { DeviceContext } from "../../contexts/devices.context";
import { mobile } from "../../config/devices";

const MenuHeader = ({ handleToggleMenu }) => {
  const { handleSetOpenCart } = useContext(CartContext);

  const { userData } = useContext(UserContext);
  const { device } = useContext(DeviceContext);

  const listOfIcons = [
    {
      key: 1,
      icon: <AiOutlineShoppingCart size={30} />,
      func: handleSetOpenCart,
      show: true,
    },
  ];

  return (
    <div className="text-center flex w-full justify-center items-center px-10 flex-1">
      <div className="flex flex-1">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="hidden lg:block"
        >
          mineworld.mcserver.io
        </motion.p>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <motion.h1
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-1xl lg:text-4xl"
        >
          Mineworld Network
        </motion.h1>
        <p className="hidden lg:inline">Tienda oficial de Mineworld</p>
      </div>

      <div className="flex flex-1 justify-end gap-3">
        {mobile(device) && (
          <Icon onClick={handleToggleMenu}>
            <AiOutlineMenu size={30} />
          </Icon>
        )}

        {userData &&
          listOfIcons.map((icon, index) => (
            <Icon key={icon.key} time={index} onClick={icon.func}>
              {icon.icon}
            </Icon>
          ))}
      </div>
    </div>
  );
};

export default MenuHeader;
