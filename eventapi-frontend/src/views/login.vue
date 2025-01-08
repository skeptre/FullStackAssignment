<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3333/login', {
          email: this.email,
          password: this.password,
        });
        console.log('Login successful:', response.data);
        // Store token and redirect
        localStorage.setItem('token', response.data.token);
        this.$router.push('/events');
      } catch (error) {
        console.error('Login failed:', error.response.data);
      }
    },
  },
};
</script>