<template>
  <v-content>
    <AppBar />
    <Notification />
    <v-container>
      <LatestNews />
      <CategoriesNews />
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Main',
  components: {
    AppBar: () => import('@/components/news/AppBar'),
    Notification: () => import('@/components/ui/Notification'),
    LatestNews: () => import('@/components/news/LatestNews'),
    CategoriesNews: () => import('@/components/news/CategoriesNews')
  },
  created() {
    this.$store.dispatch('GET_LATEST_NEWS')
    this.$store.dispatch('GET_NEWS')
    this.$store.dispatch('GET_PARENT_CATEGORIES')
  }
}
</script>
