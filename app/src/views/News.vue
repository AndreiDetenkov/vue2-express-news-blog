<template>
  <v-container fluid class="px-8">
    <Notification />
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="#f9f9f9">
          <CardToolbar title="News" btnTitle="Add news" @add-news="addNewsHandler" />
          <v-card-text>
            <DataTable :items="news" :headers="[]" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'News',
  components: {
    Notification: () => import('@/components/ui/Notification'),
    DataTable: () => import('@/components/admin/DataTable'),
    CardToolbar: () => import('@/components/admin/CardToolbar')
    // RemoveDialog: () => import('@/components/admin/RemoveDialog')
  },
  mounted() {
    this.$store.dispatch('GET_NEWS')
  },
  computed: {
    news() {
      return this.$store.getters.getNews
    }
  },
  methods: {
    addNewsHandler() {}
  }
}
</script>

<style scoped></style>
