import Wrapper from "../components/Wrapper";
import { getAllProductsByCategory } from "../utils/wordpress";
import Subtitle from "../components/Subtitle";
import ListOfProductsBox from "../components/ListOfProductsBox";
import GeneralLayout from "../components/layouts/generalLayout";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";

const HomeIlimitados = () => {
  const [homeIlimitados, setHomeIlimitados] = useState([]);
  const [loading, setLoading] = useState(false);

  const getHomeIlimitados = async () => {
    try {
      setLoading(true);
      const resRangos = await axios.post("/api/categories/productsByCategory", {
        category: "homes",
      });
      setHomeIlimitados(resRangos?.data?.products || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHomeIlimitados();
  }, []);

  return (
    <section>
      <Wrapper last>
        <div className="flex flex-col">
          <div className="mb-5">
            <Subtitle>Home Ilimitado</Subtitle>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <ListOfProductsBox products={homeIlimitados} />
          )}
        </div>
      </Wrapper>
    </section>
  );
};

/* export const getStaticProps = async () => {
  const home = await getAllProductsByCategory("homes");

  return {
    props: {
      home,
    },
  };
}; */

HomeIlimitados.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default HomeIlimitados;
