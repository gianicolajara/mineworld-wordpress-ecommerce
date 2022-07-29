import Wrapper from "../../components/Wrapper";
import { getAllProductsSlug, getProductBySlug } from "../../utils/wordpress";
import ProductDescription from "../../components/ProductDescription";
import GeneralLayout from "../../components/layouts/generalLayout";

const Product = ({ product }) => {
  return (
    <section>
      <Wrapper last>
        {product ? (
          <ProductDescription product={product} />
        ) : (
          <p>No existe este producto</p>
        )}
      </Wrapper>
    </section>
  );
};

export const getStaticPaths = async () => {
  const allProducts = await getAllProductsSlug();

  const paths = allProducts.map(({ node }) => ({
    params: {
      slug: node.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const product = await getProductBySlug(params.slug || "");

  return {
    props: {
      product,
    },
  };
};

Product.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Product;
