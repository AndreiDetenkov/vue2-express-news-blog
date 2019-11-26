<template>
  <v-container fluid class="fill-height" id="gradient">
    <Notification />
    <v-row justify="center" align="center" no-gutters>
      <router-view />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Empty',
  components: { Notification: () => import('@/components/ui/Notification') }
}
</script>

<style scoped>
#gradient {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%),
    radial-gradient(at top center, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.4) 120%) #989898;
  background-blend-mode: multiply, multiply;
}
</style>
