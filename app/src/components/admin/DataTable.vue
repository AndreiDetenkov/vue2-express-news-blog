<template>
  <v-data-table
    id="table"
    :headers="headers"
    :items="items"
    :items-per-page="10"
    :loading="loading"
    style="background: #f9f9f9;"
  >
    <template v-slot:item.editAction="{ item }">
      <v-chip outlined @click.prevent="editCategoryHandler(item)">
        <v-icon left color="success">edit</v-icon>
        Edit
      </v-chip>
    </template>
    <template v-slot:item.editUsernameAction="{ item }">
      <v-chip outlined @click.prevent="editUsernameHandler(item)">
        <v-icon left color="success">edit</v-icon>
        Edit username
      </v-chip>
    </template>
    <template v-slot:item.editPasswordAction="{ item }">
      <v-chip outlined @click.prevent="editPasswordHandler(item._id)">
        <v-icon left color="warning">edit</v-icon>
        Edit password
      </v-chip>
    </template>
    <template v-slot:item.removeAction="{ item }">
      <v-chip outlined @click="openRemoveDialogHandler(item.id, item.title)">
        <v-icon left color="error">close</v-icon>
        Remove
      </v-chip>
    </template>
    <template v-slot:item.removeUserAction="{ item }">
      <v-chip outlined @click="openRemoveUserDialogHandler(item.id, item.username)">
        <v-icon left color="error">close</v-icon>
        Remove user
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openRemoveDialogHandler(id, name) {
      this.$emit('open-remove-dialog', id, name)
    },
    editCategoryHandler(id) {
      this.$emit('edit-category', id)
    },
    editUsernameHandler(item) {
      this.$emit('edit-username', item)
    },
    editPasswordHandler(id) {
      this.$emit('edit-password', id)
    },
    openRemoveUserDialogHandler(id, username) {
      this.$emit('open-remove-user-dialog', id, username)
    }
  }
}
</script>
