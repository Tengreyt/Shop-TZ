<template>
  <v-card class="quick-view-container">
    <!-- Кнопка закрытия с нормальным крестиком -->
    <v-btn
      icon
      absolute
      right
      top
      @click="$emit('close')"
      class="close-btn"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card-text class="d-flex flex-column flex-md-row pa-4">
      <div class="product-gallery mr-md-4 mb-4">
        <ProductSlider :images="product.images" />
      </div>
      
      <div class="product-info">
        <div class="price mb-2">
          <span class="text-h5">{{ formatPrice(product.price) }}</span>
          <v-chip v-if="product.discount" color="error" small class="ml-2">
            -{{ product.discount }}%
          </v-chip>
        </div>
        
        <v-rating
          v-if="product.rating"
          :value="product.rating"
          color="amber"
          half-increments
          readonly
          dense
          class="mb-4"
        ></v-rating>
        
        <div class="description mb-4">
          {{ product.description }}
        </div>
        
        <div class="actions">
          <v-btn color="primary" large @click="addToCart">
            Добавить в корзину
          </v-btn>
          <v-btn text large class="ml-2" @click="viewDetails">
            Подробнее
          </v-btn>
        </div>
        
        <v-divider class="my-4"></v-divider>
        
        <div class="details">
          <div v-if="product.category" class="detail-item">
            <span class="detail-label">Категория:</span>
            <span>{{ product.category }}</span>
          </div>
          <div v-if="product.brand" class="detail-item">
            <span class="detail-label">Бренд:</span>
            <span>{{ product.brand }}</span>
          </div>
          <div v-if="product.stock" class="detail-item">
            <span class="detail-label">Наличие:</span>
            <span>{{ product.stock > 0 ? 'В наличии' : 'Нет в наличии' }}</span>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
import ProductSlider from './ProductSlider.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

const router = useRouter();

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

const addToCart = () => {
  // Логика добавления в корзину
  emit('close');
};

const viewDetails = () => {
  emit('close');
  router.push(`/products/${props.product.id}`);
};
</script>

<style scoped>
@import '../assets/styles/ProductQuickView.css';
</style>