import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Events from '../views/Events.vue';
import EventDetails from '../views/eventdetails.vue';
import Search from '../views/Search.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'login', component: Login },
        { path: '/register', name: 'register', component: Register },
        { path: '/events', name: 'events', component: Events },
        { path: '/events/:id', name: 'eventDetails', component: EventDetails },
        { path: '/search', name: 'search', component: Search },
    ],
});