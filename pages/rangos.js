import Wrapper from "../components/Wrapper";
import { getAllProductsByCategory } from "../utils/wordpress";
import Subtitle from "../components/Subtitle";
import ListOfProductsBox from "../components/ListOfProductsBox";
import GeneralLayout from "../components/layouts/generalLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Rangos = () => {
  const [rangos, setRangos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRangos = async () => {
    try {
      setLoading(true);
      const resRangos = await axios.post("/api/categories/productsByCategory", {
        category: "rangos",
      });
      setRangos(resRangos?.data?.products || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRangos();
  }, []);

  return (
    <section>
      <Wrapper last>
        <div className="flex flex-col">
          <div className="mb-5">
            <Subtitle>Rangos</Subtitle>
          </div>
          {loading ? <Loader /> : <ListOfProductsBox products={rangos} />}
        </div>
      </Wrapper>
    </section>
  );
};

Rangos.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Rangos;
