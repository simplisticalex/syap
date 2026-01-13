import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { incQty, decQty, removeFromCart, clearCart } from "../features/cart/cartSlice";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.list);
  const cartItems = useSelector(state => state.cart.items);

  const detailedCart = cartItems.map(ci => {
    const p = products.find(x => x.id === ci.id);
    return p
      ? { ...p, qty: ci.qty }
      : { id: ci.id, title: "Unknown", price: 0, qty: ci.qty };
  });

  const total = detailedCart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <div className={styles.headerRow}>
        <h1>Корзина</h1>
        <Link to="/">Назад</Link>
      </div>

      {detailedCart.length === 0 && (
        <div className={styles.empty}>Корзина пуста</div>
      )}

      {detailedCart.map(i => (
        <div key={i.id} className={styles.item}>
          <div className={styles.title}>{i.title}</div>

          <div>
            {i.price}$ × {i.qty} = {i.price * i.qty}$
          </div>

          <div className={styles.controls}>
            <button className={styles.btn} onClick={() => dispatch(decQty(i.id))}>-</button>
            <button className={styles.btn} onClick={() => dispatch(incQty(i.id))}>+</button>
            <button className={styles.btn} onClick={() => dispatch(removeFromCart(i.id))}>
              Удалить
            </button>
          </div>
        </div>
      ))}

      <div className={styles.total}>Итого: {total}$</div>

      {detailedCart.length > 0 && (
        <button
          className={styles.clearBtn}
          onClick={() => dispatch(clearCart())}
        >
          Очистить корзину
        </button>
      )}
    </div>
  );
}
