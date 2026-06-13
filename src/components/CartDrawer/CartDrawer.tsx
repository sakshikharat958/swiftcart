import styles from "./CartDrawer.module.scss";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  return (
    <aside className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Cart</h2>
          <button className={styles.close} onClick={onClose}>
            X
          </button>
        </div>

        <div className={styles.items}>
          {items.length === 0 ? (
            <p className={styles.empty}>Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className={styles.item}
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className={styles.image}
                />

                <div className={styles.info}>
                  <h4>{item.product.title}</h4>

                  <p className={styles.variant}>
                    {item.selectedColor} / {item.selectedSize}
                  </p>

                  <p className={styles.price}>₹{item.product.price}</p>

                  <div className={styles.quantity}>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor,
                          item.selectedSize,
                          item.quantity - 1,
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor,
                          item.selectedSize,
                          item.quantity + 1,
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className={styles.remove}
                    onClick={() =>
                      removeFromCart(
                        item.product.id,
                        item.selectedColor,
                        item.selectedSize,
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.summary}>
          <p>Subtotal: {formatPrice(subtotal)}</p>
          <h3>Total: {formatPrice(subtotal)}</h3>
          <button
            className={styles.checkout}
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default CartDrawer;
