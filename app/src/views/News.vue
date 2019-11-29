<template>
  <v-container fluid class="px-8">
    <Notification />
    <NewsDialog
      :dialog="addDialog.isShow"
      :dialogKey="addDialog.key"
      :dialogTitle="addDialog.title"
      :categories="categories"
      @close-add-dialog="addDialog.isShow = false"
    />
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="#f9f9f9">
          <CardToolbar title="News" btnTitle="Add news" @add-news="addNewsHandler" />
          <v-card-text>
            <DataTable :items="news" :headers="headers" />
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
    CardToolbar: () => import('@/components/admin/CardToolbar'),
    // RemoveDialog: () => import('@/components/admin/RemoveDialog'),
    NewsDialog: () => import('@/components/admin/NewsDialog')
  },
  data: () => ({
    headers: [
      { text: '№', align: 'left', sortable: false, value: 'idx', divider: true },
      { text: 'Title', align: 'left', sortable: true, value: 'title', divider: true },
      { text: 'Category', align: 'left', sortable: true, value: 'category', divider: true },
      { text: 'Image', align: 'left', sortable: false, value: 'imageView', divider: true },
      { text: 'Date', align: 'left', sortable: false, value: 'date', divider: true },
      { text: 'Action', align: 'center', sortable: false, value: 'editNewsAction' },
      { text: 'Action', align: 'center', sortable: false, value: 'removeNewsAction' }
    ],
    enum: {
      ADD_NEWS: 'add_news',
      EDIT_NEWS: 'edit_news',
      ADD_NEWS_TITLE: 'Add news',
      EDIT_NEWS_TITLE: 'Edit news'
    },
    addDialog: {
      isShow: false,
      title: '',
      key: ''
    }
  }),
  mounted() {
    this.$store.dispatch('GET_NEWS')
  },
  computed: {
    news() {
      return this.$store.getters.viewNews
    },
    categories() {
      return this.$store.getters.viewCategories
    }
  },
  methods: {
    async addNewsHandler() {
      await this.$store.dispatch('GET_CATEGORIES')
      this.addDialog.title = this.enum.ADD_NEWS_TITLE
      this.addDialog.key = this.enum.ADD_NEWS_TITLE
      this.addDialog.isShow = true
    }
  }
}
</script>
