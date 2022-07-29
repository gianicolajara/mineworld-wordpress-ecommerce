import ProductBox from "../ProductBox";

const ListOfProductsBox = ({ products }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] grid-rows-[repeat(auto-fill,_400px)] h-full gap-5">
      {products.map(({ node }, index) => (
        <ProductBox key={node.id} product={node} time={index} />
      ))}
    </div>
  );
};

export default ListOfProductsBox;
