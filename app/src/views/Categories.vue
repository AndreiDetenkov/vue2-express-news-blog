<template>
  <v-container fluid class="px-8">
    <Notification />
    <v-row justify="start">
      <v-col cols="8" class="pl-0">
        <v-card color="#f9f9f9">
          <CardToolbar @create-category="createHandler" />
          <v-card-text>
            <DataTable
              :items="categories"
              :headers="headers"
              :loading="loading"
              @open-dialog="openRemoveDialog"
              @edit-category="editCategoryHandler"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" class="pr-0">
        <CategoryForm :cardTitle="cardTitle" v-if="isCreateCategory" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Categories',
  components: {
    CategoryForm: () => import('@/components/admin/CategoryForm'),
    DataTable: () => import('@/components/admin/DataTable'),
    CardToolbar: () => import('@/components/admin/CardToolbar'),
    Notification: () => import('@/components/ui/Notification')
  },
  data: () => ({
    headers: [
      { text: 'N', align: 'left', sortable: false, value: 'idx', divider: true },
      { text: 'Title', align: 'left', sortable: true, value: 'title', divider: true },
      { text: 'ParentCategory', align: 'left', sortable: true, value: 'parent', divider: true },
      { text: 'Action', align: 'center', sortable: false, value: 'editAction', width: 80 },
      { text: 'Action', align: 'center', sortable: false, value: 'removeAction', width: 100 }
    ],
    isRemoveDialog: false,
    categoryId: '',
    categoryName: '',
    loading: false,
    cardTitle: '',
    isCreateCategory: false
  }),
  async mounted() {
    try {
      this.loading = true
      await this.$store.dispatch('GET_CATEGORIES')
      this.loading = false
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  computed: {
    categories() {
      return this.$store.getters.viewCategories
    }
  },
  methods: {
    createHandler() {
      this.isCreateCategory = true
      this.cardTitle = 'Add category'
    },
    openRemoveDialog(id, name) {
      this.isRemoveDialog = true
      this.categoryId = id
      this.categoryName = name
    },
    closeDialogHandler() {
      this.isRemoveDialog = false
    },
    editCategoryHandler() {}
  }
}
</script>
