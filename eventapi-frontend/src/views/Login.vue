<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <input
              v-model="email"
              type="email"
              placeholder="Email"
              required
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <input
              v-model="password"
              type="password"
              placeholder="Password"
              required
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage", // Updated to multi-word name
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3333/login", {
          email: this.email,
          password: this.password,
        });
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        this.$router.push("/events");
      } catch (error) {
        this.errorMessage =
            error.response?.data?.message || "An error occurred. Please try again.";
      }
    },
  },
};
</script>