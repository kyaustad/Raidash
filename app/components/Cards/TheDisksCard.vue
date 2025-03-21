<script lang="ts" setup>
import { DisksQuery } from "~~/queries/disks";

const data = ref();

const runDisksQuery = async () => {
  try {
    const { data: fetchData, error: fetchError } = await $fetch("/api/unraid", {
      method: "POST",

      body: DisksQuery,
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

const getProgressColor = (disk: { fsUsed: number; fsSize: number }) => {
  if (!disk) return "primary";

  const percentage = (disk.fsUsed / disk.fsSize) * 100;

  if (percentage > 90) return "error";
  if (percentage > 70) return "warning";

  return "primary";
};

onMounted(async () => {
  await runDisksQuery();
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
      <UIcon name="i-lucide-chart-bar-stacked" size="large" />
      <h2 class="font-bold text-(--ui-primary) text-xl uppercase">Disks</h2>
      <ButtonsRefreshButton class="inset-0 right-0" @refresh="runDisksQuery" />
    </div>

    <div
      class="flex flex-col items-center place-items-center text-start gap-3 w-full"
    >
      <p class="text-xs text-primary-50/35 light:text-black/50">
        {{
          (data?.array?.capacity?.kilobytes?.used / 1000 / 1000 / 1000).toFixed(
            2
          )
        }}
        TB /
        {{
          (
            data?.array?.capacity?.kilobytes?.total /
            1000 /
            1000 /
            1000
          ).toFixed(2)
        }}
        TB
      </p>

      <div
        v-for="disk in data?.array?.disks"
        :key="disk.name"
        class="p-3 flex flex-col bg-primary-50/5 rounded-xl shadow gap-2 w-full"
      >
        <div class="w-full flex flex-row justify-between gap-6 items-center">
          <p>{{ disk?.name }}</p>
          <p>{{ disk?.temp ? `${disk?.temp}c` : "Spun Down" }}</p>
          <UIcon
            class="text-xs text"
            size="x-large"
            :name="
              disk.status === 'DISK_OK'
                ? 'i-lucide-circle-check'
                : 'i-lucide-circle-x'
            "
          />
        </div>
        <UProgress
          v-model="disk.fsUsed"
          v-model:max="disk.fsSize"
          status
          class="w-full"
          :color="getProgressColor(disk)"
        >
          <template #status="{ percent }">
            <div
              class="text-nowrap min-w-full justify-between gap-4 md:gap-10 flex"
            >
              <p class="text-xs text-primary-50/35 light:text-black/50 grow">
                {{ percent }}% Usage
              </p>
              <p class="text-xs text-primary-50/35 light:text-black/50">
                {{ (disk.fsUsed / 1000 / 1000 / 1000).toFixed(2) }} TB /
                {{ (disk.fsSize / 1000 / 1000 / 1000).toFixed(2) }} TB
              </p>
            </div>
          </template>
        </UProgress>
      </div>
    </div>
  </div>
</template>

<style></style>
