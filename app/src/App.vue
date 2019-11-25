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
import News from '@/layouts/News'
export default {
  name: 'App',
  components: {
    Empty,
    Admin,
    News
  },
  computed: {
    layout() {
      return this.$route.meta.layout
    }
  }
}
</script>

<style lang="scss">
* {
  font-size: 14px;
  font-weight: 400;
  color: #333;
}
</style>
