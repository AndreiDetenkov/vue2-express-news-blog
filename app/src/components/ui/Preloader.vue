<template>
  <div class="preloader">
    <v-row justify="center" align="center" no-gutters class="fill-height">
      <v-progress-circular :size="70" color="primary" indeterminate />
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<style lang="scss" scoped>
.preloader {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 1;
  z-index: 1;
}
</style>
