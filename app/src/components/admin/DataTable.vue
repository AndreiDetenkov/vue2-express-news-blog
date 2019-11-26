<template>
  <v-data-table
    id="category-table"
    :headers="headers"
    :items="items"
    :items-per-page="10"
    :loading="loading"
    style="background: #f9f9f9;"
  >
    <template v-slot:item.editAction="{ item }">
      <v-chip outlined @click.prevent="editCategoryHandler(item.id)">
        <v-icon left color="success">edit</v-icon>
        Edit
      </v-chip>
    </template>
    <template v-slot:item.removeAction="{ item }">
      <v-chip outlined @click="openRemoveDialogHandler(item.id, item.name)">
        <v-icon left color="error">close</v-icon>
        Remove
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
    }
  }
}
</script>
