<script lang="ts" setup>
const emit = defineEmits<{
  (event: "refresh"): void;
}>();
</script>

<template>
  <div>
    <UButton
      icon="i-lucide-refresh-ccw"
      size="xs"
      class="cursor-pointer hover:scale-105 active:scale-95 transition-all ease-in-out shadow shadow-primary-900 light:shadow-primary-400"
      variant="soft"
      @click="emit('refresh')"
    />
  </div>
</template>

<style></style>
