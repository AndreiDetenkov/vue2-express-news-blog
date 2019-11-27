<template>
  <v-container fluid class="px-8">
    <Notification />
    <v-row justify="start">
      <v-col cols="8" class="pl-0">
        <v-card color="#f9f9f9">
          <CardToolbar title="Users" btnTitle="Create user" @create-category="createHandler" />
          <v-card-text>
            <DataTable
              :items="users"
              :headers="headers"
              :loading="loading"
              @open-remove-dialog="openRemoveDialog"
              @edit-category="editCategoryHandler"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" class="pr-0"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Users',
  components: {
    CardToolbar: () => import('@/components/admin/CardToolbar'),
    Notification: () => import('@/components/ui/Notification'),
    DataTable: () => import('@/components/admin/DataTable')
  },
  mounted() {
    this.$store.dispatch('GET_USERS')
  },
  data: () => ({
    headers: [
      { text: 'N', align: 'left', sortable: false, value: 'idx', divider: true },
      { text: 'Username', align: 'left', sortable: true, value: 'username', divider: true },
      { text: 'Action', align: 'center', sortable: false, value: 'editAction', width: 80 },
      { text: 'Action', align: 'center', sortable: false, value: 'removeAction', width: 100 }
    ]
  }),
  computed: {
    users() {
      return this.$store.state.users.users
    },
    loading() {
      return this.$store.state.users.loading
    }
  },
  methods: {
    createHandler() {},
    openRemoveDialog() {},
    editCategoryHandler() {}
  }
}
</script>
