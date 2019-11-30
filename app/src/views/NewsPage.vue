<template>
  <v-content>
    <AppBar />
    <Preloader v-if="loading" />
    <v-container>
      <v-img :src="`${baseUrl}uploads/${newsItem.imageName}`" class="mb-6" />
      <h1 id="title" class="mb-6">{{ newsItem.title }}</h1>
      <p class="subtitle-1">{{newsItem.description}}</p>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewsPage',
  components: {
    Preloader: () => import('@/components/ui/Preloader'),
    AppBar: () => import('@/components/news/AppBar')
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  async mounted() {
    await this.$store.dispatch('GET_NEWS_ITEM', this.id)
    this.loading = false
  },
  data: () => ({
    baseUrl: axios.defaults.baseURL,
    loading: true
  }),
  computed: {
    newsItem() {
      return this.$store.getters.getNewsItem
    }
  }
}
</script>

<style scoped lang="scss">
#title {
  font-family: 'Montserrat', sans-serif;
  font-size: 34px;
  text-transform: uppercase;
}
</style>
