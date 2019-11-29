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
      <v-chip outlined @click.prevent="editPasswordHandler(item)">
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
      <v-chip outlined @click="openRemoveUserDialogHandler(item._id, item.username)">
        <v-icon left color="error">close</v-icon>
        Remove user
      </v-chip>
    </template>
    <template v-slot:item.editNewsAction="{ item }">
      <v-chip outlined @click.prevent="editNewsHandler(item)">
        <v-icon left color="success">edit</v-icon>
        Edit
      </v-chip>
    </template>
    <template v-slot:item.removeNewsAction="{ item }">
      <v-chip outlined @click="openRemoveNewsDialogHandler(item._id, item.username)">
        <v-icon left color="error">close</v-icon>
        Remove
      </v-chip>
    </template>
    <template v-slot:item.imageView="{ item }">
      <v-btn icon @click="displayImage(item.image)"><v-icon>image</v-icon></v-btn>
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
    editPasswordHandler(item) {
      this.$emit('edit-password', item)
    },
    openRemoveUserDialogHandler(id, username) {
      this.$emit('open-remove-user-dialog', id, username)
    },
    displayImage(path) {
      console.log('path: ', path)
    },
    editNewsHandler() {},
    openRemoveNewsDialogHandler() {}
  }
}
</script>
