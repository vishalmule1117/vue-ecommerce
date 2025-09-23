import { ref } from "vue";
import axios from "axios";

export function useAddress() {
  const addresses = ref([]);
  const loading = ref(false);

  const config = useRuntimeConfig();
  const API_URL = `${config.public.apiBase}/address`;

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      "Content-Type": "application/json",
    },
  });

  const getAddresses = async () => {
    loading.value = true;
    try {
      const res = await axios.get(API_URL, getAuthConfig());
      addresses.value = res.data;
    } catch (err) {
      console.error(
        "❌ Error fetching addresses:",
        err.response?.data?.message || err.message
      );
    } finally {
      loading.value = false;
    }
  };

  const saveAddress = async (data) => {
    loading.value = true;
    try {
      const res = await axios.post(API_URL, data, getAuthConfig());
      if (res.data) addresses.value.unshift(res.data);
    } catch (err) {
      console.error(
        "❌ Error saving address:",
        err.response?.data?.message || err.message
      );
      throw err; // propagate error
    } finally {
      loading.value = false;
    }
  };

  const updateAddress = async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data, getAuthConfig());
      addresses.value = addresses.value.map((a) =>
        a._id === id ? res.data : a
      );
    } catch (err) {
      console.error(
        "❌ Error updating address:",
        err.response?.data?.message || err.message
      );
    }
  };

  const deleteAddress = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthConfig());
      addresses.value = addresses.value.filter((a) => a._id !== id);
    } catch (err) {
      console.error(
        "Error deleting address:",
        err.response?.data?.message || err.message
      );
    }
  };

  const setDefault = async (id) => {
    try {
      await axios.put(`${API_URL}/default/${id}`, {}, getAuthConfig());
      // Update local state immediately
      addresses.value = addresses.value.map((a) => ({
        ...a,
        isDefault: a._id === id,
      }));
    } catch (err) {
      console.error(
        "Error setting default address:",
        err.response?.data?.message || err.message
      );
    }
  };

  return {
    addresses,
    loading,
    getAddresses,
    saveAddress,
    updateAddress,
    deleteAddress,
    setDefault,
  };
}
