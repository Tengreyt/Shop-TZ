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
            {{ product.description || "Нет описания" }}
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
import { ref } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const tab = ref('details');
</script>

<style scoped>
.product-tabs-container {
  margin-top: 12px;
}

.tab-content-card {
  min-height: 220px; /* Увеличена высота карточки */
  padding: 16px;
  margin-top: 4px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.tab-content {
  padding: 12px 16px;
}

.description-text {
  font-size: 0.95rem;
  line-height: 1.6;
}

.specs-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.spec-item {
  display: flex;
  align-items: center;
}

.spec-label {
  font-weight: 500;
  min-width: 100px;
  color: #555;
  font-size: 0.9rem;
}

.spec-value {
  margin-left: 12px;
  font-size: 0.95rem;
}

.compact-tab {
  font-size: 0.75rem;
  letter-spacing: normal;
  text-transform: none;
  padding: 0 8px;
}

/* Адаптация для мобильных */
@media (max-width: 600px) {
  .tab-content-card {
    min-height: 180px;
    padding: 12px;
  }
  
  .spec-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .spec-value {
    margin-left: 0;
  }
  
  .spec-label {
    min-width: auto;
  }
}
</style>