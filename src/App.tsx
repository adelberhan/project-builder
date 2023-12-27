
import ProductCard from "./components/ProductCard";
import { PRODUCTS } from "./data";

const App = () => {
  const renderProductList = PRODUCTS.map((product) => <ProductCard key={product.id} product={product} />);
  return (
    <main className="container">
      <div className="m-5 p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 rounded-md">{renderProductList}</div>
    </main>
  );
};

export default App;
