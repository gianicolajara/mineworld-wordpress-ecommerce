import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { AiOutlineCloseCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../../contexts/cart.context";
import Icon from "../Icon";
import Loader from "../Loader";
import Subtitle from "../Subtitle";
import Checkout from "./Checkout";
import ItemsCart from "./ItemsCart";

const variants = {
  open: { right: 0, top: 0 },
  close: { right: -1050, top: 0 },
};

const variantsProduct = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -100,
  },
};

const Cart = ({ open, toggleCart }) => {
  const { stateCart, loading } = useContext(CartContext);

  return (
    <motion.div
      initial={open ? "open" : "close"}
      animate={open ? "open" : "close"}
      variants={variants}
      className="w-full lg:w-[450px] h-screen bg-white/50 fixed z-[50] backdrop-blur flex flex-col"
    >
      {open && (
        <>
          <div className="w-full max-h-[70vh] h-full overflow-y-auto">
            <div className="p-10">
              <div className="flex gap-3 justify-between">
                <div className="flex">
                  <Subtitle>Carrito</Subtitle>
                  <Icon time={1}>
                    <AiOutlineShoppingCart size={35} />
                  </Icon>
                </div>
                <Icon time={1} onClick={toggleCart}>
                  <AiOutlineCloseCircle size={35} />
                </Icon>
              </div>
              <>
                {!loading ? (
                  <AnimatePresence>
                    {stateCart?.cart?.length > 0 ? (
                      stateCart?.cart?.map((product, index) => (
                        <motion.div
                          key={product.id}
                          variants={variantsProduct}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{
                            duration: 0.5,
                            delay: 0.2 * index,
                            type: "linear",
                          }}
                        >
                          <ItemsCart
                            idKey={product?.key}
                            id={product?.id}
                            databaseId={product?.databaseId}
                            alt={product?.image?.altText}
                            image={product?.image?.mediaItemUrl}
                            name={product?.name}
                            price={product?.price}
                            quantity={product?.quantity}
                          />
                        </motion.div>
                      ))
                    ) : (
                      <p className="my-5">El carrito no tiene productos</p>
                    )}
                  </AnimatePresence>
                ) : (
                  <Loader />
                )}
              </>
            </div>
          </div>
          <AnimatePresence>
            {stateCart && stateCart?.cart?.length > 0 && (
              <motion.div
                variants={variantsProduct}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.5,
                  type: "linear",
                }}
                className="flex-1 bg-black/75"
              >
                <Checkout />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
