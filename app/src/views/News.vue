<template>
  <v-container fluid class="px-8">
    <Notification />
    <NewsDialog
      ref="newsDialog"
      :dialog="addDialog.isShow"
      :dialogKey="addDialog.key"
      :dialogTitle="addDialog.title"
      :categories="categories"
      :loading="addDialog.loading"
      :item="addDialog.item"
      @close-add-dialog="addDialog.isShow = false"
      @add-news="addNewsHandler"
      @edit-news="editNewsHandler"
    />
    <ImagePreview
      :dialog="preview.isShow"
      :image="preview.image"
      @close-image-preview-dialog="preview.isShow = false"
    />
    <RemoveDialog
      ref="removeDialog"
      :dialog="removeDialog.isShow"
      :name="removeDialog.news"
      :dialogKey="this.enum.REMOVE_NEWS"
      :loading="removeDialog.loading"
      @close-dialog="removeDialog.isShow = false"
      @remove-news="removeNewsHandler"
    />
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="#f9f9f9">
          <CardToolbar title="News" btnTitle="Add news" @open-news-dialog="openNewsDialogHandler" />
          <v-card-text>
            <DataTable
              :items="news"
              :headers="headers"
              :loading="getNewsLoading"
              @open-image-preview-dialog="openPreviewHandler"
              @open-remove-news-dialog="openRemoveNewsDialog"
              @open-edit-news-dialog="openEditNewsDialog"
            />
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
    RemoveDialog: () => import('@/components/admin/RemoveDialog'),
    NewsDialog: () => import('@/components/admin/NewsDialog'),
    ImagePreview: () => import('@/components/admin/ImagePreview')
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
      EDIT_NEWS_TITLE: 'Edit news',
      REMOVE_NEWS: 'remove-news'
    },
    addDialog: {
      isShow: false,
      title: '',
      key: '',
      loading: false,
      item: {}
    },
    preview: {
      isShow: false,
      image: ''
    },
    removeDialog: {
      isShow: false,
      id: '',
      news: '',
      loading: false
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
    },
    getNewsLoading() {
      return this.$store.getters.getNewsLoading
    }
  },
  methods: {
    async openNewsDialogHandler() {
      await this.$store.dispatch('GET_CATEGORIES')
      this.addDialog.title = this.enum.ADD_NEWS_TITLE
      this.addDialog.key = this.enum.ADD_NEWS
      this.addDialog.isShow = true
    },
    openPreviewHandler(image) {
      this.preview.image = image
      this.preview.isShow = true
    },
    async addNewsHandler(formData) {
      try {
        this.addDialog.loading = true
        await this.$store.dispatch('CREATE_NEWS', formData)
        this.addDialog.loading = false
        this.$refs.newsDialog.closeDialogHandler()
      } catch (e) {
        this.addDialog.loading = false
      }
    },
    async removeNewsHandler() {
      try {
        this.removeDialog.loading = true
        await this.$store.dispatch('REMOVE_NEWS', { id: this.removeDialog.id })
        this.removeDialog.loading = false
        this.$refs.removeDialog.closeDialogHandler()
      } catch (e) {
        this.removeDialog.loading = false
      }
    },
    openRemoveNewsDialog(id, title) {
      this.removeDialog.id = id
      this.removeDialog.news = title
      this.removeDialog.isShow = true
    },
    async openEditNewsDialog(item) {
      await this.$store.dispatch('GET_CATEGORIES')
      this.addDialog.title = this.enum.EDIT_NEWS_TITLE
      this.addDialog.key = this.enum.EDIT_NEWS
      this.addDialog.item = item
      this.addDialog.isShow = true
    },
    async editNewsHandler(formData, id) {
      try {
        this.addDialog.loading = true
        await this.$store.dispatch('EDIT_NEWS', { id, formData })
        this.addDialog.loading = false
        this.$refs.newsDialog.closeDialogHandler()
      } catch (e) {
        this.addDialog.loading = false
      }
    }
  }
}
</script>
