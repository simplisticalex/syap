import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";

import {
  setSearch,
  setMinPrice,
  setMaxPrice,
  setSort,
  resetFilters
} from "../features/filters/filtersSlice";

import styles from "./CategoryPage.module.css";

export default function CategoryPage() {
  const { id } = useParams();
  const categoryId = Number(id);

  const dispatch = useDispatch();

  const { list: products, status, error } = useSelector(state => state.products);
  const filters = useSelector(state => state.filters);

  const [categoryTitle, setCategoryTitle] = useState(`Категория #${categoryId}`);

  useEffect(() => {
    fetch(`http://localhost:3001/categories/${categoryId}`)
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.title) setCategoryTitle(data.title);
      })
      .catch(() => {});
  }, [categoryId]);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  const categoryProducts = useMemo(() => {
    return products.filter(p => Number(p.categoryId) === categoryId);
  }, [products, categoryId]);

  const filteredProducts = useMemo(() => {
    const s = (filters.search || "").trim().toLowerCase();
    const min = Number(filters.minPrice || 0);
    const max = Number(filters.maxPrice || 999999);
    const sort = filters.sort;

    let arr = categoryProducts;

    if (s) arr = arr.filter(p => (p.title || "").toLowerCase().includes(s));
    arr = arr.filter(p => {
      const price = Number(p.price || 0);
      return price >= min && price <= max;
    });

    const copy = [...arr];

    switch (sort) {
      case "price_asc":
        copy.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_desc":
        copy.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "title_asc":
        copy.sort((a, b) => String(a.title).localeCompare(String(b.title)));
        break;
      case "title_desc":
        copy.sort((a, b) => String(b.title).localeCompare(String(a.title)));
        break;
      default:
        break;
    }

    return copy;
  }, [categoryProducts, filters]);

  return (
    <div>
      <div className={styles.topRow}>
        <h2 className={styles.pageTitle}>{categoryTitle}</h2>

        <Link to="/" className={styles.backLink}>
          ← Назад
        </Link>
      </div>

      <div className={styles.filters}>
        <div className={styles.field}>
          <label>Искать</label>
          <input
            className={styles.input}
            value={filters.search}
            onChange={e => dispatch(setSearch(e.target.value))}
            placeholder="Напишите название товара..."
          />
        </div>

        <div className={styles.field}>
          <label>Мин цена</label>
          <input
            className={styles.input}
            value={filters.minPrice}
            onChange={e => dispatch(setMinPrice(e.target.value))}
            placeholder="0"
            inputMode="numeric"
          />
        </div>

        <div className={styles.field}>
          <label>Макс цена</label>
          <input
            className={styles.input}
            value={filters.maxPrice}
            onChange={e => dispatch(setMaxPrice(e.target.value))}
            placeholder="9999"
            inputMode="numeric"
          />
        </div>

        <div className={styles.field}>
          <label>Сортировать по</label>
          <select
            className={styles.select}
            value={filters.sort}
            onChange={e => dispatch(setSort(e.target.value))}
          >
            <option value="price_asc">Цена: от низкой → высокой</option>
            <option value="price_desc">Цена: от высокой → низкой</option>
            <option value="title_asc">Название: A → Z</option>
            <option value="title_desc">Название: Z → A</option>
          </select>
        </div>

        <button className={styles.btn} onClick={() => dispatch(resetFilters())}>
          Сбросить
        </button>
      </div>

      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}

      {status === "succeeded" && (
        <div className={styles.productsGrid}>
          {filteredProducts.map(p => (
            <div key={p.id} className={styles.productCard}>
              <div className={styles.imageWrap}>
                {p.image ? (
                  <img className={styles.image} src={p.image} alt={p.title} />
                ) : (
                  <div className={styles.noImage}>No image</div>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.productTitle}>{p.title}</div>

                <div className={styles.bottomRow}>
                  <div className={styles.price}>
                    {p.price}
                    <span className={styles.currency}>$</span>
                  </div>

                  <button className={styles.addBtn} onClick={() => dispatch(addToCart(p))}>
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && <div>Ничего не найдено</div>}
        </div>
      )}
    </div>
  );
}
