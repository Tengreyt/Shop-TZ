import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { fetchProducts } from '../api/api';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);

  const loadProducts = async () => {
    try {
      products.value = await fetchProducts();
    } catch (error) {
      console.error('Ошибка в сторе:', error);
    }
  };

  onMounted(loadProducts);

  return { products };
});