<script setup lang="ts">
import type { Shortcut } from "~~/types/shortcut";

const shortcuts = ref<Shortcut[]>([]);

const getShortcuts = async () => {
  try {
    const response: {
      ok: boolean;
      data: Shortcut[] | undefined;
      message: string;
    } = await $fetch("/api/getShortcuts", {
      method: "GET",
    });

    if (!response.ok) throw response.message;
    else if (response.data) shortcuts.value = response.data;

    console.log("Got Shortcuts:", shortcuts.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getShortcuts();
});
</script>

<template>
  <div
    class="items-center flex flex-col gap-4 h-screen p-3 md:p-8 bg-animated overflow-hidden"
  >
    <ButtonsTheColorModeButton />
    <TheHeader />

    <div class="grow w-full h-full overflow-auto">
      <div
        class="grid grid-cols-1 md:grid-cols-3 w-full gap-16 overflow-auto md:p-8 p-3"
      >
        <div class="flex flex-col gap-10">
          <CardsTheCPUCard />
          <CardsTheCacheCard />
          <CardsTheDisksCard />
        </div>

        <div class="flex flex-col md:col-span-2 gap-10">
          <TheShortcutHeader @shortcuts-changed="getShortcuts" />
          <div class="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-4">
            <CardsShortcutCard
              v-for="shortcut in shortcuts"
              :key="shortcut.name + shortcut.url"
              :shortcut="shortcut"
              @shortcuts-changed="getShortcuts"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
