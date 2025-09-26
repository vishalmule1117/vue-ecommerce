<template>
    <nav class="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <ol class="flex gap-2 items-center">
            <li>
                <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
            </li>
            <li v-for="(breadCrumbs, index) in breadCrumbs" :key="breadCrumbs.id">
                <span>/&nbsp;</span>
                <NuxtLink v-if="breadCrumbs.path && index !== breadCrumbs.length - 1" to="breadCrumbs.path"
                    class="hover:underline">{{ breadCrumbs.name }}</NuxtLink>
            </li>
        </ol>
    </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const breadCrumbs = computed(() => {
    const pathArray = route.path.split('/').filter(Boolean);
    let fullPath = '';

    return pathArray.map(segment => {
        fullPath += `/${segment}`;

        //Convert segment to title case
        const name = segment.replace(/-/g, '').replace(/\b\w/g, l => l.toUpperCase());
        return { name, path: fullPath };

    })
})

</script>