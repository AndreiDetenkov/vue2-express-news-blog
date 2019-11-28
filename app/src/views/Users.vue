<template>
  <v-container fluid class="px-8">
    <Notification />
    <v-row justify="start">
      <v-col cols="12" class="pl-0">
        <v-card color="#f9f9f9">
          <CardToolbar title="Users" btnTitle="Create user" @create-user="createUserHandler" />
          <v-card-text>
            <DataTable
              :items="users"
              :headers="headers"
              :loading="loading"
              @open-remove-user-dialog="openRemoveUserDialog"
              @edit-username="editUsernameHandler"
              @edit-password="editPasswordHandler"
            />
          </v-card-text>
        </v-card>
      </v-col>
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
      { text: 'User role', align: 'left', sortable: true, value: 'role', divider: true },
      { text: 'Action', align: 'center', sortable: false, value: 'editUsernameAction', width: 150 },
      { text: 'Action', align: 'center', sortable: false, value: 'editPasswordAction', width: 150 },
      { text: 'Action', align: 'center', sortable: false, value: 'removeUserAction', width: 100 }
    ]
  }),
  computed: {
    users() {
      return this.$store.getters.viewUsers
    },
    loading() {
      return this.$store.state.users.loading
    }
  },
  methods: {
    createUserHandler() {
      console.log('user: ')
    },
    openRemoveUserDialog() {
      console.log('remove: ')
    },
    editUsernameHandler(item) {
      console.log('item: ', item)
    },
    editPasswordHandler(item) {
      console.log('item: ', item)
    }
  }
}
</script>
