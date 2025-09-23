<template>
    <div>
        <!-- Loading -->
        <p v-if="loading">Loading...</p>

        <!-- Add Address Button -->
        <div class="mb-4">
            <button @click="startAdd()" class="bg-blue-500 text-white px-4 py-2 rounded">
                Add Address
            </button>
        </div>

        <!-- No Addresses Message -->
        <p v-if="!loading && addresses.length === 0">
            No addresses saved yet.
        </p>

        <!-- New Address Form -->
        <div v-if="editingId === 'new'" class="border p-4 mb-4 rounded">
            <input v-model="editForm.fullName" placeholder="Full Name" class="border p-1 mb-1 w-full" />
            <input v-model="editForm.line1" placeholder="Address Line 1" class="border p-1 mb-1 w-full" />
            <input v-model="editForm.line2" placeholder="Address Line 2" class="border p-1 mb-1 w-full" />
            <input v-model="editForm.contactNumber" placeholder="Contact Number" class="border p-1 mb-1 w-full" />
            <input v-model="editForm.pincode" placeholder="Pincode" class="border p-1 mb-1 w-full" />
            <input v-model="editForm.country" placeholder="Country" class="border p-1 mb-1 w-full" />
            <input v-model="editForm.accountNumber" placeholder="Account Number" class="border p-1 mb-1 w-full" />

            <div class="flex space-x-2 mt-2">
                <button @click="saveEdit('new')" class="bg-blue-500 px-3 py-1 rounded text-white">Save</button>
                <button @click="cancelEdit" class="bg-gray-400 px-3 py-1 rounded text-white">Cancel</button>
            </div>
        </div>

        <!-- Existing Addresses -->
        <div v-for="address in addresses" :key="address._id" class="border p-4 mb-4 rounded relative">
            <!-- Display Mode -->
            <div v-if="editingId !== address._id">
                <p><strong>{{ address.fullName }}</strong> {{ address.isDefault ? '(Default)' : '' }}</p>
                <p>{{ address.line1 }}</p>
                <p v-if="address.line2">{{ address.line2 }}</p>
                <p>{{ address.contactNumber }}</p>
                <p>{{ address.pincode }}, {{ address.country }}</p>
                <p>Account Number: {{ address.accountNumber }}</p>

                <div class="flex space-x-2 mt-2">
                    <button @click="startEdit(address)" class="bg-yellow-500 px-3 py-1 rounded text-white">Edit</button>
                    <button @click="deleteAddressConfirm(address._id)"
                        class="bg-red-500 px-3 py-1 rounded text-white">Delete</button>
                    <button v-if="!address.isDefault" @click="setDefaultAddressHandler(address._id)"
                        class="bg-green-500 px-3 py-1 rounded text-white">Set Default</button>
                </div>
            </div>

            <!-- Edit Mode -->
            <div v-else>
                <input v-model="editForm.fullName" placeholder="Full Name" class="border p-1 mb-1 w-full" />
                <input v-model="editForm.line1" placeholder="Address Line 1" class="border p-1 mb-1 w-full" />
                <input v-model="editForm.line2" placeholder="Address Line 2" class="border p-1 mb-1 w-full" />
                <input v-model="editForm.contactNumber" placeholder="Contact Number" class="border p-1 mb-1 w-full" />
                <input v-model="editForm.pincode" placeholder="Pincode" class="border p-1 mb-1 w-full" />
                <input v-model="editForm.country" placeholder="Country" class="border p-1 mb-1 w-full" />
                <input v-model="editForm.accountNumber" placeholder="Account Number" class="border p-1 mb-1 w-full" />

                <div class="flex space-x-2 mt-2">
                    <button @click="saveEdit(address._id)"
                        class="bg-blue-500 px-3 py-1 rounded text-white">Save</button>
                    <button @click="cancelEdit" class="bg-gray-400 px-3 py-1 rounded text-white">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAddress } from '../composables/useAddress';

const { addresses, loading, getAddresses, saveAddress, updateAddress, deleteAddress, setDefault } = useAddress();

// Fetch addresses on mount
onMounted(() => getAddresses());

const editingId = ref(null);
const editForm = reactive({
    fullName: '',
    line1: '',
    line2: '',
    contactNumber: '',
    pincode: '',
    country: '',
    accountNumber: ''
});

// Start editing existing address
const startEdit = (address) => {
    editingId.value = address._id;
    Object.assign(editForm, address);
}

// Start adding a new address
const startAdd = () => {
    editingId.value = 'new';
    Object.assign(editForm, {
        fullName: '',
        line1: '',
        line2: '',
        contactNumber: '',
        pincode: '',
        country: '',
        accountNumber: ''
    });
}

// Cancel editing or adding
const cancelEdit = () => editingId.value = null;

// Save new or edited address
const saveEdit = async (id) => {
    if (id === 'new') {
        await saveAddress({ ...editForm });
    } else {
        await updateAddress(id, { ...editForm });
    }
    editingId.value = null;
    getAddresses();
}

// Delete address
const deleteAddressConfirm = async (id) => {
    if (confirm('Are you sure you want to delete this address?')) {
        await deleteAddress(id);
        getAddresses();
    }
}

// Set default address
const setDefaultAddressHandler = async (id) => {
    await setDefault(id);
    getAddresses();
}
</script>