<template>
  <section class="categories-news">
    <!--<div v-for="c in categories" :key="c._id"></div>-->
    <div class="pt-10">
      <BlockTitle title="Cars" />
      <v-row>
        <v-col xs="12" v-for="item in newsByCars" :key="item._id">
          <v-card flat>
            <v-row justify="start">
              <v-col sm="5" md="4" lg="3" class="py-0">
                <v-img :src="`${baseUrl}uploads/${item.imageName}`" />
              </v-col>
              <v-col sm="7" md="8" lg="9" class="py-0 pr-12">
                <h3>{{ item.categoryId.title }}</h3>
                <h4>{{ item.title }}</h4>
                <p class="text-truncate hidden-xs-only">{{ item.description }}</p>
                <span>{{ item.userId.username + ', ' + moment(item.date).format('LL') }}</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="pt-10">
      <BlockTitle title="Games" />
      <v-row>
        <v-col xs="12" v-for="item in newsByGames" :key="item._id">
          <v-card flat>
            <v-row justify="start">
              <v-col sm="5" md="4" lg="3" class="py-0">
                <v-img :src="`${baseUrl}uploads/${item.imageName}`" />
              </v-col>
              <v-col sm="7" md="8" lg="9" class="py-0 pr-12">
                <h3>{{ item.categoryId.title }}</h3>
                <h4>{{ item.title }}</h4>
                <p class="text-truncate hidden-xs-only">{{ item.description }}</p>
                <span>{{ item.userId.username + ', ' + moment(item.date).format('LL') }}</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CategoriesNews',
  components: { BlockTitle: () => import('@/components/news/BlockTitle') },
  data: () => ({
    baseUrl: axios.defaults.baseURL
  }),
  computed: {
    newsByCars() {
      return this.$store.getters.getNewsByCategories('Cars')
    },
    newsByGames() {
      return this.$store.getters.getNewsByCategories('Games')
    },
    categories() {
      return this.$store.getters.getCategories
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  .v-image {
    border-radius: 8px;
  }
  h3 {
    font-family: 'Montserrat', sans-serif;
    color: #41c9c9;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    padding: 12px 0 8px;
  }
  h4 {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: #505050;
    font-weight: 700;
    text-transform: uppercase;
    padding-bottom: 8px;
  }
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    color: #8f8f8f;
  }
}
</style>
