<template>
    <div class="max-w-md mx-auto p-4 bg-white shadow rounded">
        <form action="" @submit.prevent="submitForm">
            <div class="mb-4">
                <label for="contact-message" class="block mb-1 font-medium">Message</label>

                <textarea v-model="message" placeholder="Write your message here"
                    class="w-full border rounded px-2 py-1" name="message" id="contact-message" cols="30" rows="10"
                    required></textarea>

                <button type="submit"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Submit</button>
            </div>
        </form>
        <p v-if="response" class="mt-4 text-green-600">{{ response }}</p>
        <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const message = ref("");
const response = ref("");
const config = useRuntimeConfig();
const error = ref("");

const API_URL = `${config.public.apiBase}/contact`;

//  get JWT token from local storage
const token = localStorage.getItem("token");

const submitForm = async () => {

    if (!message.value) {
        error.value = "Message is required";
        return;
    }
    try {
        const res = await axios.post(
            API_URL,
            { message: message.value },
            {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        response.value = res.data.message;
        // clear the message input
        message.value = ""

    } catch (err) {
        error.value = err.response?.data?.message || "Failed to send message. Try Again";
    }
}
</script>