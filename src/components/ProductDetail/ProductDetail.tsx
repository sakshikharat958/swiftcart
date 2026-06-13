import { useParams, useSearchParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../context/CartContext";
import styles from "./ProductDetails.module.scss";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedColor = searchParams.get("color") || "Black";
  const selectedSize = searchParams.get("size") || "M";

  const { product, loading, error } = useProduct(id);
  const [showAdded, setShowAdded] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => {
    if (product?.image) {
      setMainImage(product.image);
    }
  }, [product]);

  if (!id) return <p>Invalid product id</p>;
  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  const stock = product.id % 3 === 0 ? 0 : product.id % 2 === 0 ? 2 : 8;
  const increaseQty = () => setQuantity((q) => (q < stock ? q + 1 : q));

  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const updateVariant = (color: string, size: string) => {
    setSearchParams({ color, size });
    setQuantity(1);
  };

  const images = product.image
    ? [product.image, product.image, product.image]
    : [];

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div>
          <img
            src={mainImage || product.image}
            alt={product.title}
            className={styles.image}
          />

          <div className={styles.thumbnails}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                className={styles.thumb}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <p className={styles.category}>{product.category}</p>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p className={styles.price}>${product.price}</p>

          <div className={styles.quantity}>
            <button onClick={decreaseQty}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <div className={styles.variant}>
            <div className={styles.group}>
              <p>Color:</p>

              <button
                className={selectedColor === "Black" ? styles.active : ""}
                onClick={() => updateVariant("Black", selectedSize)}
              >
                Black
              </button>

              <button
                className={selectedColor === "White" ? styles.active : ""}
                onClick={() => updateVariant("White", selectedSize)}
              >
                White
              </button>

              <button
                className={selectedColor === "Red" ? styles.active : ""}
                onClick={() => updateVariant("Red", selectedSize)}
              >
                Red
              </button>
            </div>

            <div className={styles.group}>
              <p>Size:</p>

              <button
                className={selectedSize === "S" ? styles.active : ""}
                onClick={() => updateVariant(selectedColor, "S")}
              >
                S
              </button>

              <button
                className={selectedSize === "M" ? styles.active : ""}
                onClick={() => updateVariant(selectedColor, "M")}
              >
                M
              </button>

              <button
                className={selectedSize === "L" ? styles.active : ""}
                onClick={() => updateVariant(selectedColor, "L")}
              >
                L
              </button>
            </div>
          </div>

          {stock === 0 ? (
            <p className={styles.soldOut}>Sold Out</p>
          ) : (
            <>
              {stock <= 3 ? (
                <p className={styles.lowStock}>Low Stock ({stock} left)</p>
              ) : (
                <p className={styles.available}>Available</p>
              )}

              <button
                className={styles.button}
                onClick={() => {
                  addToCart(product, selectedColor, selectedSize, quantity);

                  setShowAdded(true);
                  setAddedToCart(true);

                  setTimeout(() => {
                    setShowAdded(false);
                  }, 2000);
                }}
              >
                Add To Cart
              </button>
            </>
          )}

          {addedToCart && (
            <button
              className={styles.viewCart}
              onClick={() => window.dispatchEvent(new Event("open-cart"))}
            >
              View Cart
            </button>
          )}
          {showAdded && (
            <p className={styles.addedMessage}>Product added to cart ✓</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
