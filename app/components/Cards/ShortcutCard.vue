<script lang="ts" setup>
import type { Shortcut } from "~~/types/shortcut";

const props = defineProps<{
  shortcut: Shortcut;
}>();

const emit = defineEmits<{
  (event: "shortcuts-changed"): void;
}>();

const showDelete = ref(false);

const handleDelete = async () => {
  try {
    const data = await $fetch("/api/deleteShortcut", {
      method: "DELETE",
      body: props.shortcut,
    });

    if (data?.status === "fail") throw new Error("Failed to delete shortcut");

    emit("shortcuts-changed");
    showDelete.value = false;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div
    v-motion-fade
    class="hover:scale-[1.02] transition-all ease-in-out justify-between flex flex-row border border-(--ui-border-accented) items-center gap-4 bg-zinc-700/25 light:bg-slate-100/25 p-4 rounded-xl shadow-lg shadow-primary-900 light:shadow-primary-400 cursor-pointer"
  >
    <a
      :href="props.shortcut.url"
      target="_blank"
      class="w-full h-full flex flex-row justify-start items-start place-items-start"
    >
      <div
        class="flex flex-row justify-start h-full items-center align-middle gap-4 w-full"
      >
        <div
          class="flex flex-col justify-center items-center place-items-center align-middle h-full"
        >
          <ClientOnly>
            <NuxtImg
              v-if="shortcut.image === false && shortcut.icon"
              :src="`icons/svg/${shortcut.icon}.svg`"
              height="50"
              width="50"
              sizes="50px"
              alt="Shortcut SVG Icon"
              class="rounded-xl max-w-[50px] max-h-[50px]"
            />
            <NuxtImg
              v-else-if="shortcut.image === true && shortcut.imageUrl"
              :src="shortcut.imageUrl"
              height="50"
              width="50"
              sizes="50px"
              alt="Shortcut Icon"
              class="rounded-xl max-w-[50px] max-h-[50px]"
            />
          </ClientOnly>
        </div>
        <div>
          <p class="font-bold">{{ props.shortcut.name }}</p>
          <p class="text-xs text-primary-50/35 light:text-black/50">
            {{ props.shortcut.url }}
          </p>
        </div>
      </div></a
    >

    <UModal v-model:open="showDelete" title="Delete Shortcut?">
      <UButton
        icon="i-lucide-trash"
        variant="soft"
        color="error"
        class="hover:scale-105 active:scale-95 shadow-lg shadow-red-500/50 cursor-pointer"
      />
      <template #body>
        <p>Are you sure you want to delete this shortcut?</p>
      </template>

      <template #footer>
        <div class="flex flex-row w-full justify-end gap-4">
          <UButton
            label="Cancel"
            variant="outline"
            color="neutral"
            @click="showDelete = false"
          />
          <UButton
            label="Delete"
            variant="soft"
            color="error"
            @click="handleDelete"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>

<style></style>
