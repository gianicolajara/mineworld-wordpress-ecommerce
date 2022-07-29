import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import CardTitle from "../CardTitle";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Icon from "../Icon";
import { CartContext } from "../../contexts/cart.context";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { useRouter } from "next/router";
import axios from "axios";

const variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
};

const initialLoading = false;

const ProductBox = ({ product, time = 0 }) => {
  const { addToCart } = useContext(CartContext);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(initialLoading);

  const router = useRouter();

  const handleAddToCar = async () => {
    setLoading(true);

    if (!userData) {
      router.push("/login");
      setLoading(false);
      return;
    }

    try {
      const resAddItemToCart = await axios.post("/api/cart/addItem", {
        product,
      });

      if (resAddItemToCart.status === 200) {
        addToCart({
          key: resAddItemToCart?.data?.data?.key || "",
          ...resAddItemToCart?.data?.data?.product?.node,
        });
      }

      setLoading(initialLoading);
    } catch (error) {
      console.error(error);
    }

    setLoading(initialLoading);
  };

  return (
    <motion.article
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5, delay: 0.1 * time + 0.5 }}
      className="w-full h-full bg-gray-100  rounded-md overflow-hidden shadow-lg flex flex-col min-h-[400px]"
    >
      <div className="w-full  h-[250px] relative">
        <div className="absolute top-0 right-0 z-10 bg-black text-white font-bold p-2">
          {product?.price}
        </div>
        <Image
          src={product.image?.mediaItemUrl}
          alt={product.image?.altText}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="flex-1 p-3 flex flex-col justify-between items-center">
        <div>
          <CardTitle>{product.name}</CardTitle>
        </div>
        <div className="flex gap-3">
          <Link href={`/product/${product.slug}`} passHref>
            <a>
              <Button>Ver</Button>
            </a>
          </Link>
          <Button onClick={handleAddToCar} loading={loading}>
            <Icon time={time}>
              <AiOutlineShoppingCart size={20} />
            </Icon>
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

ProductBox.propTypes = {
  product: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired,
};

export default ProductBox;
