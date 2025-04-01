<template>
  <v-card class="product-card">
    <v-img :src="product.images[0]" cover class="product-image"></v-img>
    <v-card-title class="product-title">{{ product.title }}</v-card-title>
    <v-card-subtitle class="product-price">{{ product.price }}$</v-card-subtitle>
    
    <ProductTabs :product="product" />
    
    <v-btn 
      @click="$emit('order', product)" 
      color="primary" 
      block 
      class="order-btn"
    >
      Заказать
    </v-btn>
  </v-card>
</template>

<script setup>
import ProductTabs from './ProductTabs.vue';

defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['order']);
</script>

<style scoped>
@import '../assets/styles/ProductCard.css';
</style>