<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
import Empty from '@/layouts/Empty'
import Admin from '@/layouts/Admin'
import Main from '@/layouts/Main'
export default {
  name: 'App',
  components: {
    Empty,
    Admin,
    Main
  },
  computed: {
    layout() {
      return this.$route.meta.layout
    }
  }
}
</script>

<style lang="scss">
#app {
  font-size: 14px;
  font-weight: 400;
  color: #333;
  background: #fff;
}
</style>
