<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-center mb-6">Search Events</h1>
    <div class="max-w-md mx-auto mb-6">
      <input
          v-model="query"
          @input="searchEvents"
          type="text"
          placeholder="Search for events..."
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div v-if="loading" class="text-center">
      <p>Searching...</p>
    </div>
    <div v-else-if="filteredEvents.length === 0" class="text-center">
      <p>No matching events found.</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="event in filteredEvents"
          :key="event.id"
          class="bg-white p-6 rounded shadow hover:shadow-lg transition"
      >
        <h2 class="text-xl font-semibold mb-2">{{ event.title }}</h2>
        <p class="text-gray-600 mb-4">{{ event.description }}</p>
        <p class="text-sm text-gray-500">
          Date: {{ new Date(event.date).toLocaleDateString() }}
        </p>
        <button
            @click="goToEventDetails(event.id)"
            class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchPage",
  data() {
    return {
      query: "",
      events: [],
      filteredEvents: [],
      loading: false,
    };
  },
  async created() {
    await this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3333/events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.events = response.data;
        this.filteredEvents = this.events;
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        this.loading = false;
      }
    },
    searchEvents() {
      const queryLower = this.query.toLowerCase();
      this.filteredEvents = this.events.filter((event) =>
          event.title.toLowerCase().includes(queryLower) ||
          event.description.toLowerCase().includes(queryLower)
      );
    },
    goToEventDetails(id) {
      this.$router.push(`/events/${id}`);
    },
  },
};
</script>