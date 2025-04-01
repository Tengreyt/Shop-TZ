<template>
  <div class="product-tabs-container">
    <v-tabs v-model="tab" grow>
      <v-tab 
        value="details" 
        class="compact-tab"
        min-width="80"
        height="22"
      >
        Описание
      </v-tab>
      <v-tab 
        value="specs" 
        class="compact-tab"
        min-width="70"
        height="22"
      >
        Характеристики
      </v-tab>
    </v-tabs>

    <v-card class="tab-content-card">
      <v-window v-model="tab">
        <v-window-item value="details">
          <v-card-text class="tab-content description-text">
            {{ truncatedDescription }}
          </v-card-text>
        </v-window-item>
        <v-window-item value="specs">
          <v-card-text class="tab-content specs-content">
            <div class="spec-item">
              <span class="spec-label">Бренд:</span>
              <span class="spec-value">{{ product.brand || "Не указан" }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Рейтинг:</span>
              <span class="spec-value">{{ product.rating }}/5</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">В наличии:</span>
              <span class="spec-value">{{ product.stock }} шт.</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Цена:</span>
              <span class="spec-value">{{ product.price }}$</span>
            </div>
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const tab = ref('details');

const truncatedDescription = computed(() => {
  const desc = props.product.description || "Нет описания";
  return desc.length > 100 ? `${desc.substring(0, 107)}...` : desc;
});
</script>

<style scoped>
@import '../assets/styles/ProductTabs.css';
</style>