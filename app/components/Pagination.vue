<template>
    <div class="flex items-center justify-center mt-6 space-x-2">
        <button @click="changePage(props.modelValue - 1)" :disabled="props.modelValue === 1" class="p-[7px] rounded-[100px] border bg-white shadow-sm text-gray-600 w-10 h-10 mr-[10px]
        hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z" />
            </svg>
        </button>

        <button v-for="p in pages" :key="p" @click="changePage(p)" :class="[
            'px-3 py-1  ',
            p === props.modelValue ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-[100px] w-8 h-8 text-blue border-blue-500 cursor-pointer' : 'bg-white text-gray-600 hover:bg-gray-100 cursor-pointer rounded-[100px] w-8 h-8'
        ]">
            {{ p }}
        </button>

        <button @click="changePage(props.modelValue + 1)" :disabled="props.modelValue === props.totalPages"
            class="p-[7px] rounded-[100px] border bg-white shadow-sm text-gray-600 w-10 h-10 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z" />
            </svg>
        </button>
    </div>
</template>

<script setup>
import { computed } from "vue";

// v-model default = modelValue
const props = defineProps({
    modelValue: {
        type: Number,
        default: 1,
    },
    totalPages: {
        type: Number,
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
