import Wrapper from "../components/Wrapper";
import Subtitle from "../components/Subtitle";
import ListOfProductsBox from "../components/ListOfProductsBox";
import GeneralLayout from "../components/layouts/generalLayout";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";

const Spawners = () => {
  const [spawner, setSpawner] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSpawners = async () => {
    try {
      setLoading(true);
      const resRangos = await axios.post("/api/categories/productsByCategory", {
        category: "spawner",
      });
      setSpawner(resRangos?.data?.products || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSpawners();
  }, []);

  return (
    <section>
      <Wrapper last>
        <div className="flex flex-col">
          <div className="mb-5">
            <Subtitle>Spawner</Subtitle>
          </div>
          {loading ? <Loader /> : <ListOfProductsBox products={spawner} />}
        </div>
      </Wrapper>
    </section>
  );
};

Spawners.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Spawners;
