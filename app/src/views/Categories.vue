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
        <transition name="slide" mode="out-in">
          <CategoryForm v-if="isCategoryForm" :cardTitle="cardTitle" @close-form="closeHandler" />
        </transition>
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
    cardTitle: '',
    isCategoryForm: false
  }),
  mounted() {
    this.$store.dispatch('GET_CATEGORIES')
  },
  computed: {
    categories() {
      return this.$store.getters.viewCategories
    },
    loading() {
      return this.$store.state.categories.loading
    }
  },
  methods: {
    createHandler() {
      this.isCategoryForm = true
      this.cardTitle = 'Create category'
    },
    closeHandler() {
      this.isCategoryForm = false
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

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.slide-inter-to,
.slide-leave {
  opacity: 1;
  transform: translateY(0);
}
</style>
