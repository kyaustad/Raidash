<script lang="ts" setup>
import { CpuQuery } from "~~/queries/cpu";

const data = ref();

const runCpuQuery = async () => {
  try {
    const { data: fetchData, error: fetchError } = await $fetch("/api/unraid", {
      method: "POST",

      body: CpuQuery,
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

onMounted(async () => {
  await runCpuQuery();
});

const cpuIcon = computed(() => {
  if (data.value?.info?.cpu?.manufacturer === "AMD") {
    return "i-logos-amd";
  } else if (data.value?.info?.cpu?.manufacturer === "INTEL") {
    return "i-logos-intel";
  }

  return "i-lucide-cpu";
});
</script>

<template>
  <div
    v-motion-fade
    class="hover:scale-105 transition-all ease-in-out flex flex-col border border-(--ui-border-accented) items-start gap-4 bg-zinc-700/25 light:bg-slate-100/25 p-4 rounded-xl shadow-lg shadow-primary-900 light:shadow-primary-400 max-h-[300px]"
  >
    <div
      class="flex flex-row w-full text-center items-center justify-between align-middle gap-10"
    >
      <UIcon name="i-lucide-cpu" size="large" />
      <h2 class="font-bold text-(--ui-primary) text-xl uppercase">CPU</h2>
      <ButtonsRefreshButton class="inset-0 right-0" @refresh="runCpuQuery" />
    </div>

    <div class="flex flex-col items-start text-start gap-2">
      <UIcon :name="cpuIcon" class="dark:bg-white py-3 px-8" />
      <p class="text-xs">{{ data?.info?.cpu?.socket }}</p>
      <p>{{ data?.info?.cpu?.brand }}</p>
      <p>Cores: {{ data?.info?.cpu?.cores }}</p>
      <p>Threads: {{ data?.info?.cpu?.threads }}</p>

      <p>Speed: {{ data?.info?.cpu?.speed }} GHz</p>
    </div>
  </div>
</template>

<style></style>
