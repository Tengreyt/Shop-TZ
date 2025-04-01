<template>
  <div class="slider-wrapper">
    <h2 class="text-h5 text-center mb-4">Рекомендуемые товары</h2>
    <div v-if="products.length" class="products-container">
      <!-- Вертикальный список для мобильных -->
      <div class="mobile-products-list" v-if="isMobile">
          <v-card 
            v-for="product in products" 
            :key="product.id"
            class="mobile-product-card"
            @click="openProduct(product)"
          >
            <div class="mobile-card-content">
              <v-img 
                :src="product.images[0]" 
                height="120"
                width="120"
                cover
                class="mobile-product-image"
              ></v-img>
              <div class="mobile-card-info">
                <v-card-title class="mobile-product-title">
                  {{ product.title }}
                </v-card-title>
                <v-card-text class="mobile-product-text">
                  <div class="price">{{ formatPrice(product.price) }}</div>
                  <v-rating
                    v-if="product.rating"
                    :value="product.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                </v-card-text>
              </div>
            </div>
          </v-card>
        </div>
      
      <!-- Горизонтальный слайдер для десктопа -->
      <div 
          class="slide-group-container desktop-slider"
          v-else
          ref="sliderContainer"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          @touchstart="startDrag"
          @touchmove="onDrag"
          @touchend="endDrag"
        >
        <v-slide-group 
          show-arrows 
          class="centered-slide-group"
          v-if="products.length"
          ref="sliderContent"
        >
          <v-slide-group-item 
            v-for="product in products" 
            :key="product.id"
            v-slot="{ isSelected, toggle }"
          >
            <v-card 
              class="ma-2 product-card" 
              width="200"
              @click="openProduct(product)"
            >
              <div class="image-container">
                <v-img 
                  :src="product.images[0]" 
                  height="160" 
                  cover
                  class="product-image"
                ></v-img>
                <v-btn
                  v-if="showQuickView"
                  class="quick-view-btn"
                  color="primary"
                  small
                  @click.stop="openQuickView(product)"
                >
                  Быстрый просмотр
                </v-btn>
              </div>
              <v-card-title class="text-subtitle-1 text-center product-title">
                {{ product.title }}
              </v-card-title>
              <v-card-text class="text-center">
                <div class="price">{{ formatPrice(product.price) }}</div>
                <v-rating
                  v-if="product.rating"
                  :value="product.rating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
              </v-card-text>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
        <div v-else class="no-products">
          Нет рекомендуемых товаров
        </div>
      </div>
    </div>
    <div v-else class="no-products">
      Нет рекомендуемых товаров
    </div>

    <!-- Диалог быстрого просмотра с кнопкой закрытия -->
    <v-dialog v-model="quickViewDialog" max-width="800">
      <ProductQuickView 
        v-if="selectedProduct"
        :product="selectedProduct"
        @close="quickViewDialog = false"
      />
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import ProductQuickView from './ProductQuickView.vue';

// Добавляем определение мобильного устройства
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
});

const props = defineProps({
  products: {
    type: Array,
    required: true,
    default: () => []
  },
  showQuickView: {
    type: Boolean,
    default: true
  }
});

const router = useRouter();
const quickViewDialog = ref(false);
const selectedProduct = ref(null);
const sliderContainer = ref(null);
const sliderContent = ref(null);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

const openProduct = (product) => {
  router.push(`/products/${product.id}`);
};

const openQuickView = (product) => {
  selectedProduct.value = product;
  quickViewDialog.value = true;
};

const startDrag = (e) => {
  isDragging.value = true;
  startX.value = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
  scrollLeft.value = sliderContainer.value.scrollLeft;
  sliderContainer.value.style.cursor = 'grabbing';
  sliderContainer.value.style.scrollBehavior = 'auto';
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  
  const x = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
  const walk = (x - startX.value) * 2; // Умножаем для более плавного скролла
  sliderContainer.value.scrollLeft = scrollLeft.value - walk;
};

const endDrag = () => {
  isDragging.value = false;
  if (sliderContainer.value) {
    sliderContainer.value.style.cursor = 'grab';
    sliderContainer.value.style.scrollBehavior = 'smooth';
  }
};
</script>

<style scoped>
@import '../assets/styles/ProductSlider.css';
</style>