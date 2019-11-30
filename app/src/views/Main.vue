<template>
  <v-content>
    <AppBar />
    <Notification />
    <v-container>
      <LatestNews />
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Main',
  components: {
    AppBar: () => import('@/components/news/AppBar'),
    Notification: () => import('@/components/ui/Notification'),
    LatestNews: () => import('@/components/news/LatestNews')
  }
}
</script>
