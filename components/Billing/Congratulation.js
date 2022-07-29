import { useRouter } from "next/router";
import Wrapper from "../Wrapper";
import PropTypes from "prop-types";
import Subtitle from "../Subtitle";
import Loader from "../Loader";
import Button from "../Button";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const Congratulation = ({ purchaseData = null }) => {
  const { handleSetCloseCart } = useContext(CartContext);

  const router = useRouter();

  const handleBackToHome = () => {
    handleSetCloseCart();
    router.push("/");
  };

  return (
    <section>
      <Wrapper last>
        {purchaseData ? (
          <div>
            <Subtitle>
              Compra Completada | Orden #{purchaseData?.order?.orderNumber || 0}
            </Subtitle>
            <div>Lista de compra</div>
            <div className="my-5">
              {purchaseData?.order?.lineItems?.edges.map(({ node }) => (
                <div key={node?.product?.node?.id} className="border-2 p-4">
                  <div>
                    <p>
                      <span className="font-bold">Nombre del producto: </span>
                      {node?.product?.node?.name || "Titulo"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Cantidad: </span>
                      {node?.quantity || "Cantidad"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Precio Total: </span>
                      {node?.total || "Total"}$
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p>
              <span className="font-bold">Total pagado: </span>
              {purchaseData?.order?.total || "Total"}$
            </p>
            <p>
              <span className="font-bold">Metodo de pago: </span>
              {purchaseData?.order?.paymentMethodTitle || "payment method"}
            </p>
            <p>
              <span className="font-bold">Nota: </span>
              Copia el numero de orden y enviaselo a un administrador para que
              lo pueda ver.
            </p>
            <div className="mt-5">
              <Button onClick={handleBackToHome}>Volver al Inicio</Button>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Wrapper>
    </section>
  );
};

export default Congratulation;

Congratulation.propTypes = {
  purchaseData: PropTypes.object,
};
