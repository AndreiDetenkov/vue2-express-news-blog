<template>
  <v-container fluid class="px-8">
    <Notification />
    <UserDialog
      ref="userDialog"
      :dialog="dialog.isShow"
      :dialogKey="dialog.key"
      :title="dialog.title"
      :item="dialog.item"
      :loading="dialog.loading"
      @close-user-dialog="dialog.isShow = false"
      @edit-username="editUsernameHandler"
      @edit-password="editPasswordHandler"
    />
    <RemoveDialog
      ref="removeDialog"
      :dialog="removeDialog.isShow"
      :name="removeDialog.username"
      :dialogKey="this.enum.REMOVE_USER"
      :loading="removeDialog.loading"
      @close-dialog="removeDialog.isShow = false"
      @remove-user="removeUserHandler"
    />
    <v-row justify="start">
      <v-col cols="12">
        <v-card color="#f9f9f9">
          <CardToolbar title="Users" />
          <v-card-text>
            <DataTable
              :items="users"
              :headers="headers"
              :loading="getUsersLoading"
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
// TODO: add ability to add user for user with role admin only
export default {
  name: 'Users',
  components: {
    Notification: () => import('@/components/ui/Notification'),
    DataTable: () => import('@/components/admin/DataTable'),
    UserDialog: () => import('@/components/admin/UserDialog'),
    CardToolbar: () => import('@/components/admin/CardToolbar'),
    RemoveDialog: () => import('@/components/admin/RemoveDialog')
  },
  mounted() {
    this.$store.dispatch('GET_USERS')
  },
  data: () => ({
    headers: [
      { text: 'N', align: 'left', sortable: false, value: 'idx', divider: true },
      { text: 'Username', align: 'left', sortable: true, value: 'username', divider: true },
      { text: 'User role', align: 'left', sortable: true, value: 'role', divider: true },
      { text: 'Action', align: 'center', sortable: false, value: 'editUsernameAction' },
      { text: 'Action', align: 'center', sortable: false, value: 'editPasswordAction' },
      { text: 'Action', align: 'center', sortable: false, value: 'removeUserAction' }
    ],
    enum: {
      EDIT_USERNAME: 'edit_username',
      EDIT_PASSWORD: 'edit_password',
      EDIT_USERNAME_TITLE: 'Edit Username',
      EDIT_PASSWORD_TITLE: 'Edit Password',
      REMOVE_USER: 'remove-user'
    },
    dialog: {
      isShow: false,
      key: '',
      title: '',
      item: {},
      loading: false
    },
    removeDialog: {
      isShow: false,
      id: '',
      username: '',
      loading: false
    }
  }),
  computed: {
    users() {
      return this.$store.getters.viewUsers
    },
    getUsersLoading() {
      return this.$store.state.users.loading
    }
  },
  methods: {
    openRemoveUserDialog(id, username) {
      this.removeDialog.id = id
      this.removeDialog.username = username
      this.removeDialog.isShow = true
    },
    async editHandler(actionName, payload) {
      try {
        this.dialog.loading = true
        await this.$store.dispatch(`${actionName}`, payload)
        this.dialog.loading = false
        this.$refs.userDialog.closeDialogHandler()
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    openDialogHandler(key, title, item) {
      this.dialog.key = key
      this.dialog.title = title
      this.dialog.item = item
      this.dialog.isShow = true
    },
    openUsernameDialogHandler(item) {
      this.openDialogHandler(this.enum.EDIT_USERNAME, this.enum.EDIT_USERNAME_TITLE, item)
    },
    async editUsernameHandler(id, username) {
      await this.editHandler('EDIT_USERNAME', { id, username })
    },
    openPasswordDialogHandler(item) {
      this.openDialogHandler(this.enum.EDIT_PASSWORD, this.enum.EDIT_PASSWORD_TITLE, item)
    },
    async editPasswordHandler(id, password) {
      await this.editHandler('EDIT_PASSWORD', { id, password })
    },
    async removeUserHandler() {
      try {
        this.removeDialog.loading = true
        await this.$store.dispatch('REMOVE_USER', { id: this.removeDialog.id })
        this.removeDialog.loading = true
        this.removeDialog.isShow = false
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
}
</script>
