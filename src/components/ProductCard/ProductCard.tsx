import { Link } from "react-router-dom";

import type { Product } from "../../types/product";

import styles from "./ProductCard.module.scss";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const stock = product.id % 3 === 0 ? 0 : 5;
  const [showAdded, setShowAdded] = useState(false);
  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />

      <h3 className={styles.title}>{product.title}</h3>

      <p className={styles.category}>{product.category}</p>

      <p className={styles.price}>${product.price}</p>
      <div className={styles.spacer} />

      <div className={styles.spacer} />

      {stock === 0 ? (
        <button className={styles.soldOutButton} disabled>
          Sold Out
        </button>
      ) : (
        <button
          className={styles.quickAdd}
          onClick={(e) => {
            e.preventDefault();

            addToCart(product, "Black", "M", 1);

            setShowAdded(true);

            setTimeout(() => {
              setShowAdded(false);
            }, 2000);
          }}
        >
          Quick Add
        </button>
      )}
      {showAdded && (
        <p className={styles.addedMessage}>Product added to cart ✓</p>
      )}
    </Link>
  );
}

export default ProductCard;
