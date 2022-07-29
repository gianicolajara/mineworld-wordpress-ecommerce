import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";
import Cart from "../Cart";
import MenuList from "./MenuList";
import MenuNav from "./MenuNav";
import MenuNews from "./MenuNews";

const Menu = () => {
  const { open, toggleCart } = useContext(CartContext);
  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <div className="relative top-0 left-0">
        <MenuNews />
      </div>
      <nav className="sticky top-0 left-0 z-50 shadow-md">
        <MenuNav handleToggleMenu={handleToggleMenu} />
        <MenuList openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </nav>
      <Cart open={open} toggleCart={toggleCart} />
    </>
  );
};

export default Menu;
