import Wrapper from "../components/Wrapper";
import { getAllProductsByCategory } from "../utils/wordpress";
import Subtitle from "../components/Subtitle";
import ListOfProductsBox from "../components/ListOfProductsBox";
import GeneralLayout from "../components/layouts/generalLayout";

const SobreNosotros = ({ unban }) => {
  return (
    <section>
      <Wrapper last>
        <div className="flex flex-col">
          <div className="mb-5">
            <Subtitle>UnBan</Subtitle>
          </div>
          <ListOfProductsBox products={unban} />
        </div>
      </Wrapper>
    </section>
  );
};

export const getStaticProps = async () => {
  const unban = await getAllProductsByCategory("desban");

  return {
    props: {
      unban,
    },
  };
};

SobreNosotros.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default SobreNosotros;
