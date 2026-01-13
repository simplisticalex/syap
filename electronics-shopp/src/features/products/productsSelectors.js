import { createSelector } from "reselect";

const selectProducts = state => state.products.list;
const selectFilters = state => state.filters;
const selectCategoryId = (_, categoryId) => categoryId;

export const selectFilteredProductsByCategory = createSelector(
  [selectProducts, selectFilters, selectCategoryId],
  (products, filters, categoryId) => {
    let result = products.filter(p => p.categoryId === categoryId);

    const q = filters.search.trim().toLowerCase();
    if (q) {
      result = result.filter(p => p.title.toLowerCase().includes(q));
    }

    const min = filters.minPrice === "" ? null : Number(filters.minPrice);
    const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);

    if (min !== null && !Number.isNaN(min)) {
      result = result.filter(p => p.price >= min);
    }
    if (max !== null && !Number.isNaN(max)) {
      result = result.filter(p => p.price <= max);
    }
  
    const sorted = [...result];
    switch (filters.sort) {
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "title_asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title_desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        sorted.sort((a, b) => a.price - b.price);
        break;
    }

    return sorted;
  }
);
