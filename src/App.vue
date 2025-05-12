<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <header-pane></header-pane>
    <!-- <div class="text-center">
      <h3 class="m-2" style="color:red;">This is a development website. Please dont save your important / production
        data here.</h3>
      <p><a href="https://google.com">Click here for production site</a></p>
    </div> -->
    <main class="flex-fill">
      <router-view />
    </main>
    <footer-pane></footer-pane>
  </div>
</template>

<script>
import HeaderPane from './components/HeaderPane.vue'
import FooterPane from './components/FooterPane.vue'

export default {
  name: 'app',
  components: {
    HeaderPane,
    FooterPane
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap');

/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f5b759;
  margin-top: 30px;
} */
</style>
