<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div v-if="loading" class="text-center">
      <p>Loading event details...</p>
    </div>
    <div v-else-if="event" class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 class="text-3xl font-bold mb-4">{{ event.title }}</h1>
      <p class="text-gray-600 mb-4">{{ event.description }}</p>
      <p class="text-sm text-gray-500 mb-2">
        Date: {{ new Date(event.date).toLocaleDateString() }}
      </p>
      <p class="text-sm text-gray-500">
        Location: {{ event.location || "No location provided" }}
      </p>
      <button
          @click="goBack"
          class="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Back to Events
      </button>
    </div>
    <div v-else class="text-center">
      <p class="text-red-500">Event not found.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EventDetailsPage",
  data() {
    return {
      event: null,
      loading: true,
    };
  },
  async created() {
    const eventId = this.$route.params.id; // Get event ID from the route
    try {
      const response = await axios.get(`http://localhost:3333/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      this.event = response.data;
    } catch (error) {
      console.error("Failed to fetch event details:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    goBack() {
      this.$router.push("/events"); // Navigate back to the events list
    },
  },
};
</script>