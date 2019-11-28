<template>
  <v-content>
    <AppBar />
    <Notification />
    <v-container>
      <p>news</p>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Main',
  components: {
    AppBar: () => import('@/components/news/AppBar'),
    Notification: () => import('@/components/ui/Notification')
  }
}
</script>
