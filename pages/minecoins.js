import Wrapper from "../components/Wrapper";
import { getAllProductsByCategory } from "../utils/wordpress";
import Subtitle from "../components/Subtitle";
import ListOfProductsBox from "../components/ListOfProductsBox";
import GeneralLayout from "../components/layouts/generalLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Minecoins = () => {
  const [minecoins, setMinecoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMinecoins = async () => {
    try {
      setLoading(true);
      const resRangos = await axios.post("/api/categories/productsByCategory", {
        category: "minecoins",
      });
      setMinecoins(resRangos?.data?.products || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMinecoins();
  }, []);

  return (
    <section>
      <Wrapper last>
        <div className="flex flex-col">
          <div className="mb-5">
            <Subtitle>Minecoins</Subtitle>
          </div>
          {loading ? <Loader /> : <ListOfProductsBox products={minecoins} />}
        </div>
      </Wrapper>
    </section>
  );
};

/* export const getStaticProps = async () => {
  const minecoins = await getAllProductsByCategory("minecoins");

  return {
    props: {
      minecoins,
    },
  };
}; */

Minecoins.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Minecoins;
