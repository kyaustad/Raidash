<!-- eslint-disable @typescript-eslint/unified-signatures -->
<script lang="ts" setup>
import type * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import { shortcutSchema } from "~/schema/shortcutSchema";

const addOpen = ref(false);
const icons = ref<string[]>([]);
const searchTerm = ref("");
const pageSize = 25;
const currentPage = ref(1);

const resetIconPagination = () => {
  currentPage.value = 1;
};

const nextPage = () => {
  if (currentPage.value < totalIconPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const filteredIcons = computed(() => {
  if (!searchTerm.value) return [...icons.value];
  return [...icons.value].filter((icon) =>
    icon.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const paginatedIcons = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return [...filteredIcons.value].slice(start, start + pageSize);
});

const totalIconPages = computed(() =>
  Math.ceil(filteredIcons.value.length / pageSize)
);

const fetchIcons = async () => {
  try {
    const data = await $fetch("/api/getIcons");

    if (Array.isArray(data)) {
      icons.value = data.map((file) => file.replace(".svg", ""));
    }

    console.log("Icons:", icons.value);
  } catch (error) {
    console.error("Error fetching icons:", error);
  }
};

const emit = defineEmits<{
  (event: "shortcuts-changed"): void;
}>();

const state = ref({
  name: "",
  url: "",
  image: false,
  icon: "unraid",
  imageUrl: "",
});
type Schema = v.InferOutput<typeof shortcutSchema>;

const submitForm = async (event: FormSubmitEvent<Schema>) => {
  console.log(event.data);
  try {
    const response = await $fetch("/api/addShortcut", {
      method: "POST",
      body: event.data,
    });

    if (response.status === "error") throw response.data;

    if (response.status === "success") {
      console.log("Success:", response);
      emit("shortcuts-changed");
      state.value = reactive({
        name: "",
        url: "",
        image: false,
        icon: "unraid",
        imageUrl: "",
      });
      addOpen.value = false;
    }
  } catch (error) {
    console.error("Error saving shortcut:", error);
  }
};

onMounted(async () => {
  await fetchIcons();
  resetIconPagination();
  console.log("Page:", paginatedIcons.value);
});
</script>

<template>
  <div
    v-motion-fade
    class="md:col-span-2 bg-zinc-700/25 light:bg-slate-100/25 p-4 rounded-xl shadow-lg shadow-primary-900 light:shadow-primary-400 flex flex-row w-full justify-between align-middle items-center"
  >
    <UModal
      v-model:open="addOpen"
      title="Add Shortcut"
      aria-describedby="Add Shortcut Modal for adding quick links"
    >
      <UButton
        icon="i-lucide-circle-plus"
        variant="soft"
        class="cursor-pointer hover:scale-105 active:scale-95 transition-all ease-in-out shadow shadow-primary-900 light:shadow-primary-400"
      />
      <template #body>
        <UForm
          :state="state"
          :schema="shortcutSchema"
          class="flex flex-col w-full gap-4"
          @submit="submitForm"
        >
          <UFormField label="Name" name="name">
            <UInput v-model="state.name" class="w-full" />
          </UFormField>

          <UFormField label="URL" name="url">
            <UInput v-model="state.url" class="w-full" />
          </UFormField>

          <UFormField label="Use Image?" name="image" class="w-full">
            <USwitch v-model="state.image" />
          </UFormField>

          <UFormField v-if="state.image" label="Image URL" name="imageUrl">
            <UInput
              v-model="state.imageUrl"
              placeholder="Enter image URL"
              class="w-full"
            />
          </UFormField>

          <UFormField v-if="!state.image" label="Icon" name="icon">
            <div class="flex justify-between gap-2">
              <NuxtImg
                :src="`icons/svg/${state.icon}.svg`"
                height="50"
                width="50"
                sizes="50px"
                alt="Shortcut SVG Icon"
                class="rounded-xl max-w-[50px] max-h-[50px]"
              />
              <!-- <UInput
                v-model="state.icon"
                placeholder="Enter icon name"
                class="w-full grow"
              /> -->

              <LazyUSelectMenu
                v-model="state.icon"
                v-model:search-term="searchTerm"
                :items="paginatedIcons"
                class="w-full"
                @update:search-term="resetIconPagination"
              >
                <template #trailing>
                  <div class="gap-4 flex">
                    <UButton
                      :disabled="currentPage === 1"
                      variant="soft"
                      size="sm"
                      @click="prevPage"
                    >
                      Previous
                    </UButton>
                    <UButton
                      :disabled="currentPage === totalIconPages"
                      variant="soft"
                      size="sm"
                      @click="nextPage"
                    >
                      Next
                    </UButton>
                  </div>
                  <!-- <div v-else>
                    {{ option.label }}
                  </div> -->
                </template>
              </LazyUSelectMenu>
            </div>
          </UFormField>

          <UButton
            type="submit"
            variant="outline"
            class="justify-center cursor-pointer"
          >
            Submit
          </UButton>
        </UForm>
      </template>
    </UModal>
    <!-- <p>Shortcuts</p> -->
    <ButtonsRefreshButton @refresh="emit('shortcuts-changed')" />
  </div>
</template>

<style></style>
