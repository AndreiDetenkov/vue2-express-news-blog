<template>
  <v-container fluid class="px-8">
    <Notification />
    <UserDialog
      :dialog="dialog.isShow"
      :dialogKey="dialog.key"
      :title="dialog.title"
      :item="dialog.item"
      :loading="dialog.loading"
      @close-user-dialog="dialog.isShow = false"
      @edit-username="editUsernameHandler"
    />
    <v-row justify="start">
      <v-col cols="12" class="pl-0">
        <v-card color="#f9f9f9">
          <CardToolbar title="Users" />
          <v-card-text>
            <DataTable
              :items="users"
              :headers="headers"
              :loading="loading"
              @open-remove-user-dialog="openRemoveUserDialog"
              @edit-username="openUsernameDialogHandler"
              @edit-password="openPasswordDialogHandler"
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
    Notification: () => import('@/components/ui/Notification'),
    DataTable: () => import('@/components/admin/DataTable'),
    UserDialog: () => import('@/components/admin/UserDialog'),
    CardToolbar: () => import('@/components/admin/CardToolbar')
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
    ],
    enum: {
      EDIT_USERNAME: 'edit_username',
      EDIT_PASSWORD: 'edit_password',
      EDIT_USERNAME_TITLE: 'Edit Username',
      EDIT_PASSWORD_TITLE: 'Edit Password'
    },
    dialog: {
      isShow: false,
      key: '',
      title: '',
      item: {},
      loading: false
    }
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
    openRemoveUserDialog() {
      console.log('remove: ')
    },
    openUsernameDialogHandler(item) {
      this.dialog.key = this.enum.EDIT_USERNAME
      this.dialog.title = this.enum.EDIT_USERNAME_TITLE
      this.dialog.item = item
      this.dialog.isShow = true
    },
    async editUsernameHandler(id, username) {
      try {
        this.dialog.loading = true
        await this.$store.dispatch('EDIT_USERNAME', { id, username })
        this.dialog.loading = false
        this.dialog.isShow = false
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    openPasswordDialogHandler() {
      this.dialog.key = this.enum.EDIT_PASSWORD
      this.dialog.title = this.enum.EDIT_PASSWORD_TITLE
      this.dialog.isShow = true
    },
    editPasswordHandler() {}
  }
}
</script>
