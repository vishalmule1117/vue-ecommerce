<template>
    <div class="sort-by">
        <select v-model="selectedSort" @change="$emit('update-sort', selectedSort)"
            class="p-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300">
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const selectedSort = ref(''); // Stores the currently selected sort option

const sortOptions = [
    { label: 'Sort By...', value: '' },
    { label: 'Name (A–Z)', value: 'title' },
    { label: 'Name (Z–A)', value: '-title' },
    { label: 'Price (Low → High)', value: 'price' },
    { label: 'Price (High → Low)', value: '-price' },
    { label: 'Newest', value: '-createdAt' },
    { label: 'Oldest', value: 'createdAt' }
];
</script>