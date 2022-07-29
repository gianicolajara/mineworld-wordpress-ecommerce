import Wrapper from "../components/Wrapper";
import Subtitle from "../components/Subtitle";
import ListOfProductsBox from "../components/ListOfProductsBox";
import GeneralLayout from "../components/layouts/generalLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const ApelarBan = () => {
  const [unbanApeal, setUnbanApeal] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFlies = async () => {
    try {
      setLoading(true);
      const resRangos = await axios.post("/api/categories/productsByCategory", {
        category: "unban",
      });
      setUnbanApeal(resRangos?.data?.products || []);
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
            <Subtitle>UnBan</Subtitle>
          </div>
          {loading ? <Loader /> : <ListOfProductsBox products={unbanApeal} />}
        </div>
      </Wrapper>
    </section>
  );
};

/* export const getStaticProps = async () => {
  const unban = await getAllProductsByCategory("unban");

  return {
    props: {
      unban,
    },
  };
}; */

ApelarBan.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default ApelarBan;
