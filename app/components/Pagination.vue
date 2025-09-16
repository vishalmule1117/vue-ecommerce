<template>
    <div class="flex items-center justify-center mt-6 space-x-2">
        <button @click="changePage(props.modelValue - 1)" :disabled="props.modelValue === 1" class="px-3 py-1 rounded-lg border bg-white shadow-sm text-gray-600 
        hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            Previous
        </button>

        <button v-for="p in pages" :key="p" @click="changePage(p)" :class="[
            'px-3 py-1 m-10 rounded-lg border shadow-sm',
            p === props.modelValue ? 'bg-blue-500 text-white border-blue-500 cursor-pointer' : 'bg-white text-gray-600 hover:bg-gray-100 cursor-pointer'
        ]">
            {{ p }}
        </button>

        <button @click="changePage(props.modelValue + 1)" :disabled="props.modelValue === props.totalPages" class="px-3 py-1 rounded-lg border bg-white shadow-sm text-gray-600 
        hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            Next
        </button>
    </div>
</template>

<script setup>
import { computed } from "vue";

// v-model default = modelValue
const props = defineProps({
    modelValue: {
        type: Number,
        required: true,
        default: 1,
    },
    totalPages: {
        type: Number,
        required: true,
        default: 1,
    },
});

const emit = defineEmits(["update:modelValue"]);

const pages = computed(() => {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
});

const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= props.totalPages) {
        emit("update:modelValue", newPage);
    }
};
</script>
