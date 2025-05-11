<template>
  <header>
    <b-navbar sticky toggleable class="navbar navbar-expand-md navbar-dark font-weight-bold">
      <!-- if login will see dashboard as landing page -->
      <b-navbar-brand :to="loggedIn ? '/home' : '/dashboard'">
        <div class="logo-image">
          <img src="/assets/dash_48.png" class="img-fluid" />
        </div>
      </b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon> </template>
      </b-navbar-toggle>
      <b-collapse id="navbar-toggle-collapse" is-nav>
        <ul class="navbar-nav ml-auto">
          <b-nav-item v-if="!loggedIn" to="/home">
            Home
            <span class="sr-only">(current)</span>
          </b-nav-item>
          <b-nav-item v-if="loggedIn" to="/">
            Home
            <span class="sr-only">(current)</span>
          </b-nav-item>

          <b-nav-item-dropdown v-if="loggedIn" text="Cultivar" class="dropdown w-25" right>
            <b-dropdown-item to="/cultivar/form">Form</b-dropdown-item>
            <b-dropdown-item to="/cultivar/list">List</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item v-if="loggedIn" to="/location/list">Location</b-nav-item>

          <b-nav-item-dropdown v-if="loggedIn" text="Harvest" class="dropdown w-25" right>
            <b-dropdown-item to="/harvest/transplant/new">New</b-dropdown-item>
            <b-dropdown-item to="/harvest/schedule">Harvest Schedule</b-dropdown-item>
            <b-dropdown-item to="/harvest/transplant/list">Transplant List</b-dropdown-item>
            <b-dropdown-item to="/harvest/crop/list">Crop List</b-dropdown-item>
            <!-- <b-dropdown-item to="/harvest/details">Details</b-dropdown-item> -->
            <b-dropdown-item to="/harvest/calendar">Calendar</b-dropdown-item>
            <b-dropdown-item to="/harvest/borrow/new">Borrow</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown v-if="loggedIn" text="Booking" class="" right>
            <b-item-dropdown class="m-3">B2B Booking
              <b-dropdown-item to="/booking/list">Orders</b-dropdown-item>
              <b-dropdown-item to="/booking/upload">Upload</b-dropdown-item>
            </b-item-dropdown>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown v-if="loggedIn" text="Inventory" class="" right>
            <b-item-dropdown class="m-3">Seed Inventory
              <b-dropdown-item to="/seed/list">Seed List</b-dropdown-item>
              <b-dropdown-item to="/seed/new">Add New Seed</b-dropdown-item>
              <b-dropdown-item to="/seed/inventory/hq/scan">HQ Scanner</b-dropdown-item>
              <b-dropdown-item to="/seed/inventory/farm/scan">Farm Scanner</b-dropdown-item>
              <b-dropdown-item to="/seed/inventory/scan/list">Scan History</b-dropdown-item>
              <b-dropdown-item to="/seed/inventory/hq/list">HQ Seed Inventory</b-dropdown-item>
              <b-dropdown-item to="/seed/inventory/farm/list">Farm Seed Inventory</b-dropdown-item>
            </b-item-dropdown>

          </b-nav-item-dropdown>

          <b-nav-item v-if="loggedIn" class="dropdown w-25" right>
            <template v-slot:button-content>
              <b>{{ showUsername }}</b>
            </template>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item>
          <b-nav-item v-else class="dropdown w-25" text="Login" right></b-nav-item>
        </ul>
      </b-collapse>
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
