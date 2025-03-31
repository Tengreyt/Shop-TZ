export const fetchProducts = async () => {
    try {
      // https://api.escuelajs.co/api/v1/products
      // https://fakestoreapi.com/products
      // https://dummyjson.com/products
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      throw error; // Пробрасываем ошибку дальше для обработки в сторе
    }
  };