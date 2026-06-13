import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import CartDrawer from "../CartDrawer/CartDrawer";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    const handleOpenCart = () => {
      setIsCartOpen(true);
    };

    window.addEventListener("open-cart", handleOpenCart);

    return () => {
      window.removeEventListener("open-cart", handleOpenCart);
    };
  }, []);
  return (
    <>
      <header className={styles.navbar}>
        <h2 className={styles.logo}>SwiftCart</h2>

        <div className={styles.actions}>
          <button
            className={styles.cartButton}
            onClick={() => setIsCartOpen(true)}
          >
            Cart
            {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </button>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;
