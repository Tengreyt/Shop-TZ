<template>
    <v-container v-if="product">
      <h1>{{ product.title }}</h1>
      <h2>{{ product.price }}$</h2>
  
      <ProductSlider :images="product.images" />
      <ProductTabs :description="product.description" :specs="product" />
      <OrderForm />
    </v-container>
    <v-container v-else>
      <v-spinner />
    </v-container>
</template>

<script setup>
import ProductSlider from '../components/ProductSlider.vue';
import ProductTabs from '../components/ProductTabs.vue';
import OrderForm from '../components/OrderForm.vue';

</script>
  