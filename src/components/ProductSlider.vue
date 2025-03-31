<template>
  <div class="slider-wrapper">
    <h2 class="text-h5 text-center mb-4">Рекомендуемые товары</h2>
    <div class="slide-group-container">
      <v-slide-group show-arrows class="centered-slide-group">
        <v-slide-group-item 
          v-for="product in products" 
          :key="product.id"
        >
          <v-card class="ma-2" width="200">
            <v-img :src="product.images[0]" height="160" cover></v-img>
            <v-card-title class="text-subtitle-1 text-center">{{ product.title }}</v-card-title>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.slider-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.slide-group-container {
  overflow: hidden;
  width: 100%;
}

.centered-slide-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 8px 0;
}

/* Для мобильных устройств */
@media (max-width: 600px) {
  .centered-slide-group {
    justify-content: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding: 8px 16px;
    scrollbar-width: none; /* Для Firefox */
  }
  
  .centered-slide-group::-webkit-scrollbar {
    display: none; /* Для Chrome/Safari */
  }
  
  .v-card {
    min-width: 180px;
  }
}
</style>