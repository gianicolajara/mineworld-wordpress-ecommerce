import Wrapper from "../components/Wrapper";
import { getAllProductsByCategory } from "../utils/wordpress";
import Subtitle from "../components/Subtitle";
import ListOfProductsBox from "../components/ListOfProductsBox";
import GeneralLayout from "../components/layouts/generalLayout";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";

const Fly = () => {
  const [fly, setFly] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFlies = async () => {
    try {
      setLoading(true);
      const resRangos = await axios.post("/api/categories/productsByCategory", {
        category: "fly",
      });
      setFly(resRangos?.data?.products || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFlies();
  }, []);

  return (
    <section>
      <Wrapper last>
        <div className="flex flex-col">
          <div className="mb-5">
            <Subtitle>Fly</Subtitle>
          </div>
          {loading ? <Loader /> : <ListOfProductsBox products={fly} />}
        </div>
      </Wrapper>
    </section>
  );
};

/* export const getStaticProps = async () => {
  const fly = await getAllProductsByCategory("fly");

  return {
    props: {
      fly,
    },
  };
}; */

Fly.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Fly;
