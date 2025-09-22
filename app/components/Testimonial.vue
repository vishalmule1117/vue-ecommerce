<template>
    <div>

        <!-- Testimonials Grid -->
        <!-- Testimonial 1 -->
        <div
            class="group relative bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
            <!-- Border Effect -->
            <div
                class="absolute inset-0 rounded-lg bg-gradient-to-r from-[#B2E5D9] to-[#5D8AA8] opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-4 border-transparent">
            </div>
            <div class="relative z-10">
                <div class="text-[#5D8AA8] text-5xl leading-none mb-4 font-serif">“</div>
                <p class="text-[#4F4F4F] text-lg leading-relaxed mb-4">
                    {{ review.comment }}
                </p>
                <div class="flex items-center mt-6">
                    <img src="https://i.pravatar.cc/150?img=23" alt="Client 1"
                        class="w-16 h-16 rounded-full border-4 border-[#B2E5D9] shadow-md mr-4">
                    <div>
                        <h3 class="text-lg font-bold text-[#5D8AA8]">{{ review.reviewerName }}</h3>
                        <!-- <p class="text-sm text-[#4F4F4F]">United States</p> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    review: {
        type: Object,
        required: true
    }
})
</script>