<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card class="pa-6" style="border-radius:16px;">
        <v-card-text class="title text-center pb-6 pt-4">
          Do you really want to remove this category,
          <span class="font-weight-bold headline"> {{ name }} </span>?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="gray" large rounded text @click.stop="closeDialogHandler" class="px-6 mx-2">
            Cancel
          </v-btn>
          <v-btn
            color="error"
            large
            rounded
            outlined
            @click.stop="removeHandler"
            :loading="loading"
            class="px-6 mx-2"
          >
            Remove
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'RemoveDialog',
  props: {
    dialog: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    loading() {
      return this.$store.state.categories.loading
    }
  },
  methods: {
    closeDialogHandler() {
      this.$emit('close-dialog')
    },
    removeHandler() {
      this.$emit('remove-category')
    }
  }
}
</script>
