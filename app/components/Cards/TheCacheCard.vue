<script lang="ts" setup>
import { CacheQuery } from "~~/queries/cache";

const data = ref();

const runCacheQuery = async () => {
  try {
    const { data: fetchData, error: fetchError } = await $fetch("/api/unraid", {
      method: "POST",

      body: CacheQuery,
    });

    if (fetchError) throw fetchError;

    if (fetchData) {
      console.log("Data:", fetchData.data);
      data.value = fetchData.data;
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

const getProgressColor = (cache: { fsUsed: number; fsSize: number }) => {
  if (!cache) return "primary";

  const percentage = (cache.fsUsed / cache.fsSize) * 100;

  if (percentage > 90) return "error";
  if (percentage > 70) return "warning";

  return "primary";
};

onMounted(async () => {
  await runCacheQuery();
});
</script>

<template>
  <div
    v-motion-fade
    class="hover:scale-105 transition-all ease-in-out flex flex-col border border-(--ui-border-accented) items-start gap-4 bg-zinc-700/25 light:bg-slate-100/25 p-4 rounded-xl shadow-lg shadow-primary-900 light:shadow-primary-400"
  >
    <div
      class="flex flex-row w-full text-center items-center justify-between align-middle gap-10"
    >
      <UIcon name="i-lucide-hard-drive-download" size="large" />
      <h2 class="font-bold text-(--ui-primary) text-xl uppercase">Cache</h2>
      <ButtonsRefreshButton class="inset-0 right-0" @refresh="runCacheQuery" />
    </div>

    <div
      class="flex flex-col items-center place-items-center text-start gap-3 w-full"
    >
      <div
        v-for="cache in data?.array?.caches"
        :key="cache.name"
        class="p-3 flex flex-col bg-primary-50/5 rounded-xl shadow gap-2 w-full"
      >
        <div class="w-full flex flex-row justify-between gap-6 items-center">
          <p>{{ cache?.name }}</p>
          <UIcon
            class="text-xs text"
            size="x-large"
            :name="
              cache.status === 'DISK_OK'
                ? 'i-lucide-circle-check'
                : 'i-lucide-circle-x'
            "
          />
        </div>
        <UProgress
          v-model="cache.fsUsed"
          v-model:max="cache.fsSize"
          status
          :color="getProgressColor(cache)"
        >
          <template #status="{ percent }">
            <div class="text-nowrap min-w-full justify-between gap-10 flex">
              <p class="text-xs text-primary-50/35 light:text-black/50 grow">
                {{ percent }}% Usage
              </p>
              <p class="text-xs text-primary-50/35 light:text-black/50">
                {{ (cache.fsUsed / 1000 / 1000 / 1000).toFixed(2) }} TB /
                {{ (cache.fsSize / 1000 / 1000 / 1000).toFixed(2) }} TB
              </p>
            </div>
          </template>
        </UProgress>
      </div>
    </div>
  </div>
</template>

<style></style>
