import Wrapper from "../components/Wrapper";
import { getAllProductsByCategory } from "../utils/wordpress";
import Subtitle from "../components/Subtitle";
import ListOfProductsBox from "../components/ListOfProductsBox";
import GeneralLayout from "../components/layouts/generalLayout";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";

const Claimblocks = () => {
  const [claimBlocks, setClaimBlocks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getClaimblocks = async () => {
    try {
      setLoading(true);
      const resRangos = await axios.post("/api/categories/productsByCategory", {
        category: "claimblocks",
      });
      setClaimBlocks(resRangos?.data?.products || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClaimblocks();
  }, []);

  return (
    <section>
      <Wrapper last>
        <div className="flex flex-col">
          <div className="mb-5">
            <Subtitle>Claimblocks</Subtitle>
          </div>
          {loading ? <Loader /> : <ListOfProductsBox products={claimBlocks} />}
        </div>
      </Wrapper>
    </section>
  );
};

export const getStaticProps = async () => {
  const claimblocks = await getAllProductsByCategory("claimblocks");

  return {
    props: {
      claimblocks,
    },
  };
};

Claimblocks.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Claimblocks;
