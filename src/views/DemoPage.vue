<template>
  <div class="text-center">
    <p>{{ hello }}</p>

    <div class="triangle-down d-flex"></div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      hello: 'Demo Page'
    }
  }

}
</script>

<style scoped>
.triangle-down {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  /* border-top: 100px solid #3498db; */

  border-bottom: 100px solid #3498db;
  /* Triangle colour */

}
</style>