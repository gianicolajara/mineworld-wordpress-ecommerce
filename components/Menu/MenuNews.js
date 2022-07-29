import Link from "next/link";
import { motion } from "framer-motion";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import Loader from "../Loader";

const MenuNews = () => {
  const { userData, handleLogout, loading } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);

  const handleLogoutAndDeleteCart = () => {
    handleLogout();
    clearCart();
  };

  return (
    <motion.div
      className="w-full h-[40px] bg-black flex items-center px-10 justify-between"
      whileInView={{ height: 40 }}
      animate={{
        height: 0,
      }}
    >
      {loading ? (
        <Loader color="text-white" />
      ) : (
        <Link href="/login">
          <a className=" text-white">
            {userData ? userData?.user?.username : "Login"}
          </a>
        </Link>
      )}
      {userData && (
        <a
          className="text-white cursor-pointer"
          onClick={handleLogoutAndDeleteCart}
        >
          Cerrar Sessión
        </a>
      )}
    </motion.div>
  );
};

export default MenuNews;
