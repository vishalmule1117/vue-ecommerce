<template>
    <div class="sort-by">
        <!-- Dropdown bound to local selectedSort -->
        <select v-model="selectedSort" class="p-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300">
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

// ✅ Must be modelValue (not modelValues)
const props = defineProps({
    modelValue: { type: String, default: "" }
});

// ✅ Must match Vue v-model event format: update:modelValue
const emit = defineEmits(["update:modelValue"]);

// ✅ Local state synced with parent
const selectedSort = ref(props.modelValue);

// ✅ Watch dropdown changes & sync back to parent
watch(selectedSort, (newVal) => {
    emit("update:modelValue", newVal);
});

// Sort options
const sortOptions = [
    { label: "Sort By...", value: "" },
    { label: "Name (Z–A)", value: "-title" },
    { label: "Name (A–Z)", value: "title" },
    { label: "Price (Low → High)", value: "price" },
    { label: "Price (High → Low)", value: "-price" },
    { label: "Newest", value: "-createdAt" },
    { label: "Oldest", value: "createdAt" }
];
</script>