import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";

export default function Header() {
  const cartCount = useSelector(state =>
    state.cart.items.reduce((sum, i) => sum + i.qty, 0)
  );

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/" className={styles.brand}>
          <img className={styles.logo} src="/images/cartlogo.png" alt="Logo" />
          <span className={styles.title}>Electronics Shop</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
          Каталог
        </NavLink>

        <NavLink to="/cart" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
          Корзина{cartCount > 0 ? <span className={styles.badge}>{cartCount}</span> : null}
        </NavLink>
      </nav>
    </header>
  );
}
