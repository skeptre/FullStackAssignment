<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-center mb-8">Events</h1>
    <div v-if="loading" class="text-center">
      <p>Loading events...</p>
    </div>
    <div v-else-if="events.length === 0" class="text-center">
      <p>No events found.</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="event in events"
          :key="event.id"
          class="bg-white p-6 rounded shadow hover:shadow-lg transition"
      >
        <h2 class="text-xl font-semibold mb-2">{{ event.title }}</h2>
        <p class="text-gray-600 mb-4">{{ event.description }}</p>
        <p class="text-sm text-gray-500">
          Date: {{ new Date(event.date).toLocaleDateString() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EventsPage",
  data() {
    return {
      events: [],
      loading: true,
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3333/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      this.events = response.data;
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>