import ProductGrid from "../components/ProductGrid/ProductGrid";

import { useProducts } from "../hooks/useProducts";

function Home() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p>Loading Product</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <ProductGrid products={products} />
    </div>
  );
}

export default Home;
