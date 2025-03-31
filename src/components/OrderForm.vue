<template>
  <v-dialog v-model="isOpen" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Оформление заказа</v-card-title>
      <v-card-text>
        <v-text-field 
          v-model="form.name" 
          label="Ваше имя" 
          :rules="[required]"
        />
        <v-text-field 
          v-model="form.phone" 
          label="Телефон" 
          :rules="[required]"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="close">Отмена</v-btn>
        <v-btn color="primary" @click="submit">Подтвердить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'submit']);

const isOpen = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
});

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal);
});

const form = ref({
  name: '',
  phone: ''
});

const required = value => !!value || 'Обязательное поле';

const submit = () => {
  if (!form.value.name || !form.value.phone) {
    return;
  }
  emit('submit', form.value);
  close();
};

const close = () => {
  isOpen.value = false;
  form.value = { name: '', phone: '' };
};
</script>