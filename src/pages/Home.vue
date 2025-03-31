<template>
  <v-container>
    <h1 class="text-h4 mb-6">Каталог товаров</h1>
    
    <ProductSlider v-if="featuredProducts.length" :products="featuredProducts" />
    <v-row>
      <v-col 
        v-for="product in products" 
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard 
          :product="product" 
          @order="showOrderForm"
        />
      </v-col>
    </v-row>
    
    <OrderForm 
      v-model="showDialog" 
      @submit="handleOrderSubmit"
    />
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '../store/products';
import ProductCard from '../components/ProductCard.vue';
import OrderForm from '../components/OrderForm.vue';
import ProductSlider from '../components/ProductSlider.vue';

const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);

const showDialog = ref(false);
const selectedProduct = ref(null);

const featuredProducts = computed(() => {
  return products.value.filter(p => p.rating > 4.5).slice(0, 5);
});

const showOrderForm = (product) => {
  selectedProduct.value = product;
  showDialog.value = true;
};

const handleOrderSubmit = (orderData) => {
  console.log('Order submitted:', {
    product: selectedProduct.value,
    customer: orderData
  });
};
</script>