<template>
  <v-card height="500px">
    <v-img :src="product.images[0]" height="160px" cover></v-img>
    <v-card-title class="text-h6">{{ product.title }}</v-card-title>
    <v-card-subtitle class="text-h6">{{ product.price }}$</v-card-subtitle>
    
    <ProductTabs :product="product" />
    
    <v-btn 
      @click="$emit('order', product)" 
      color="primary" 
      block 
      class="mt-4"
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