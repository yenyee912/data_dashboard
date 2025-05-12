<template>
  <header>
    <b-navbar sticky toggleable class="navbar-bg navbar-expand-md navbar-dark">
      <!-- if login will see dashboard as landing page -->
      <b-navbar-brand :to="loggedIn ? '/home' : '/dashboard'">
        <div class="logo-image">
          <img src="/assets/placeholder.png" class="img-fluid" />
        </div>
      </b-navbar-brand>

      <!-- for phone, use to toggle the rest nav, and also left aligned items-->
      <b-navbar-toggle target="navbar-toggle-collapse">
        <!-- <template :default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template> -->
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <!-- ml-auto: align right-->
        <b-navbar-nav class="ml-auto" v-if="!loggedIn">
          <b-nav-item to="/homepage">Home</b-nav-item>
          <b-nav-item textto="/login">Login</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="loggedIn">
          <b-nav-item to="/dashboard">Dashboard</b-nav-item>
          <b-nav-item to="/booking">Booking</b-nav-item>
          <b-nav-item-dropdown :text="showUsername">
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse><!-- end of navbar right b-collapse -->

    </b-navbar>
  </header>
</template>

<script>
import { authComputed } from '../store/helpers.js'
export default {
  computed: {
    ...authComputed,
    showUsername: function () {
      return localStorage.username
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  }
}
</script>
