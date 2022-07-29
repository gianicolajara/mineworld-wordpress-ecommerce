import Wrapper from "../components/Wrapper";
import { getAllProductsByCategory } from "../utils/wordpress";
import Subtitle from "../components/Subtitle";
import ListOfProductsBox from "../components/ListOfProductsBox";
import GeneralLayout from "../components/layouts/generalLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Reparacion = () => {
  const [fix, setFix] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFixes = async () => {
    try {
      setLoading(true);
      const resRangos = await axios.post("/api/categories/productsByCategory", {
        category: "fix",
      });
      setFix(resRangos?.data?.products || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFixes();
  }, []);

  return (
    <section>
      <Wrapper last>
        <div className="flex flex-col">
          <div className="mb-5">
            <Subtitle>Reparación de Items</Subtitle>
          </div>
          {loading ? <Loader /> : <ListOfProductsBox products={fix} />}
        </div>
      </Wrapper>
    </section>
  );
};

/* export const getStaticProps = async () => {
  const fix = await getAllProductsByCategory("fix");

  return {
    props: {
      fix,
    },
  };
}; */

Reparacion.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Reparacion;
