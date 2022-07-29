import Image from "next/image";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../Button";
import { numberPriceToString } from "../../lib/numbers";
import { removeItemsFromCart } from "../../utils/wordpress";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";

const initialLoading = false;

const ItemsCart = ({
  id = "",
  image = "",
  alt = "",
  name = "",
  price = 0,
  quantity = 0,
  time = 0,
  databaseId = 0,
  idKey = "",
}) => {
  const { updateQuantity, deleteToCart } = useContext(CartContext);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(initialLoading);

  const handleMoreQuantity = () => {
    updateQuantity({
      id,
      quantity: quantity + 1,
    });
  };

  const handleLessQuantity = () => {
    updateQuantity({
      id,
      quantity: quantity - 1,
    });
  };

  const handleDeleteCart = async () => {
    setLoading(true);

    try {
      const res = await axios.post("/api/cart/deleteItem", {
        key: idKey,
      });

      if (res.status === 200) {
        deleteToCart(idKey);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <article className="flex gap-3 border-b-2 border-slate-800 mb-5 py-5">
      <div>
        <Image
          src={image}
          alt={alt}
          objectFit="cover"
          width={100}
          height={100}
          className="w-full"
        />
      </div>
      <div>
        <p className="font-bold text-lg">{name}</p>
        <div className="flex items-center gap-2">
          <p>
            <span className="font-bold">Cantidad: </span>
            {quantity}
          </p>
          <button
            className="bg-black text-white px-1 select-none"
            onClick={handleMoreQuantity}
          >
            +
          </button>
          <button
            className="bg-black text-white px-1 select-none"
            onClick={handleLessQuantity}
          >
            -
          </button>
        </div>
        <p>
          <span className="font-bold">Precio: </span>
          {price}
        </p>
        <p>
          <span className="font-bold">Total: </span>$
          {numberPriceToString(price, quantity).toFixed(2)}
        </p>
        <Button onClick={handleDeleteCart} loading={loading}>
          Borrar
        </Button>
      </div>
    </article>
  );
};

ItemsCart.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.number,
  time: PropTypes.number,
  open: PropTypes.bool,
  databaseId: PropTypes.number,
  key: PropTypes.string,
};

export default ItemsCart;
