import PropTypes from "prop-types";
import ImageDescription from "./ImageDescription";
import BodyDescription from "./BodyDescription";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import { useRouter } from "next/router";
import Wrapper from "../Wrapper";

const ProductDescription = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleAddToCart = async (product) => {
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

      setLoading(false);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <article className="grid grid-cols-1 grid-rows-[1fr,_auto] lg:grid-cols-2 lg:grid-rows-[minmax(400px,_1fr)] gap-5">
      <ImageDescription
        image={product.image?.mediaItemUrl}
        alt={product.image?.altText}
      />
      <BodyDescription
        name={product?.name}
        description={product?.description}
        price={product?.price}
        handleAddCart={() => handleAddToCart(product)}
        loading={loading}
      />
    </article>
  );
};

ProductDescription.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductDescription;
