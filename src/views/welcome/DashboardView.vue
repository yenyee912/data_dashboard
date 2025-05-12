<template>
  <b-container>
    <b-row class="mb-4">
      <b-col>
        <h1 class="hello-landing">
          Hello, <b class="text-success">{{ usernameFunction }}!</b>
        </h1>
      </b-col>
    </b-row>

    <h2 class="welcome-header">Welcome to Data Dashboard</h2>

    <div class="landing-heading mt-5">PRODUCT</div>
    <b-row class="mb-5">
      <b-col cols="12" md="3" class="mb-3">
        <b-card class="text-center card-landing" body-class="pb-1">
          <b-link to="/product/list">
            <b-card-img src="/assets/placeholder.png" alt="List Icon" class="w-50 mx-auto"></b-card-img>
          </b-link>
          <b-card-title class="landing-sub">LIST</b-card-title>
          <b-card-text class="caption-2">View all products.</b-card-text>
        </b-card>
      </b-col>

      <b-col cols="12" md="3" class="mb-3">
        <b-card class="text-center card-landing" body-class="pb-1">
          <b-link to="/cultivar/form">
            <b-card-img src="/assets/placeholder.png" alt="Add Icon" class="w-50 mx-auto"></b-card-img>
          </b-link>
          <b-card-title class="landing-sub">ADD/EDIT</b-card-title>
          <b-card-text class="caption-2">Setup products profile.</b-card-text>
        </b-card>
      </b-col>
    </b-row>

    <div class="landing-heading mt-5">INVENTORY</div>
    <b-row>
      <b-col cols="12" md="3" class="mb-3">
        <b-card class="text-center card-landing" body-class="pb-1">
          <b-link to="/inv-chart">
            <b-card-img src="/assets/placeholder.png" alt="View inventory chart" class="w-50 mx-auto"></b-card-img>
          </b-link>
          <b-card-title class="landing-sub">VIEW</b-card-title>
          <b-card-text class="caption-2">View inventory chart.</b-card-text>
        </b-card>
      </b-col>

      <b-col cols="12" md="3" class="mb-3">
        <b-card class="text-center card-landing" body-class="pb-1">
          <b-link to="/harvest/transplant/list">
            <b-card-img src="/assets/placeholder.png" alt="Transplant List" class="w-50 mx-auto"></b-card-img>
          </b-link>
          <b-card-title class="landing-sub">ENTRY LIST</b-card-title>
          <b-card-text class="caption-2">View data entry</b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { authComputed } from '../../store/helpers.js'

export default {
  computed: {
    ...authComputed,
    usernameFunction() {
      return localStorage.username;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'Login' });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.hello-landing {
  font-family: 'Futura', sans-serif;
  color: #28273d;
  font-size: 35px;
  margin-top: 40px;
}

.welcome-header {
  font-family: 'Futura', sans-serif;
  font-weight: 400;
  font-size: 20px;
  margin-top: -5px;
  margin-bottom: 50px;
}

.landing-heading {
  font-family: 'Futura', sans-serif;
  color: #2bb573;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1.2px;
}

.landing-sub {
  font-family: 'Futura', sans-serif;
  color: #28273d;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
}

.caption-2 {
  font-size: 12px;
  color: gray;
  margin-top: -5px;
}

.card-landing {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 20px;
  border: none;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.05);
}
</style>
