<template>
  <section class="news pt-6">
    <BlockTitle title="Latest news" />
    <v-row justify="space-between">
      <v-col xs="12" sm="6" md="4" lg="3" v-for="item in latestNews" :key="item._id">
        <v-card flat id="news">
          <v-img :src="`${baseUrl}uploads/${item.image}`" class="news-image" />
          <v-card-text class="px-0">
            <h4 class="news-category">{{ item.category }}</h4>
            <h4 class="news-title">{{ item.title }}</h4>
            <h6 class="news-author">{{item.username + ', ' + item.date}}</h6>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LatestNews',
  components: { BlockTitle: () => import('@/components/news/BlockTitle') },
  data: () => ({
    baseUrl: axios.defaults.baseURL
  }),
  computed: {
    latestNews() {
      return this.$store.getters.getLatestNews
    }
  }
}
</script>

<style lang="scss" scoped>
#news {
  border-radius: 8px;
  .news-image {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .news-category {
    font-family: 'Montserrat', sans-serif;
    color: #41c9c9;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
  }
  .news-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: #505050;
    font-weight: 700;
    text-transform: uppercase;
  }
  .news-author {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    color: #8f8f8f;
  }
}
</style>
