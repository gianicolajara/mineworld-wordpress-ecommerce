import MenuHeader from "./MenuHeader";
import MenuList from "./MenuList";

const MenuNav = ({ handleToggleMenu }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 h-[100px]  bg-white">
      <MenuHeader handleToggleMenu={handleToggleMenu} />
    </div>
  );
};

export default MenuNav;
