<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card class="pa-2">
        <v-card-title class="pb-10">
          <v-row justify="space-between" no-gutters>
            <span class="headline font-weight-bold">{{ dialogTitle }}</span>
            <v-btn icon @click.stop="closeDialogHandler"><v-icon color="black">close</v-icon></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text class="text-center">
          <v-form ref="form" lazy-validation v-model="valid" @submit.prevent="onSubmitHandler">
            <v-select
              v-model="categoryId"
              :items="categories"
              item-text="title"
              item-value="id"
              label="Category"
              outlined
            />
            <v-text-field outlined validate-on-blur label="Title" v-model="title" />
            <v-textarea outlined validate-on-blur label="Description" v-model="description" />
            <v-file-input
              v-model="files"
              label="Image"
              outlined
              prepend-icon="mdi-camera"
              accept="image/jpg, image/jpeg"
            />
            <v-row justify="center" class="pt-6">
              <v-btn color="gray" large text @click.prevent="closeDialogHandler" class="px-6 mx-2">
                Cancel
              </v-btn>
              <v-btn color="primary" large outlined class="px-6 mx-2" type="submit">
                {{ dialogTitle }}
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'NewsDialog',
  props: {
    dialog: {
      type: Boolean,
      default: false,
      require: true
    },
    dialogTitle: {
      type: String,
      default: '',
      require: true
    },
    dialogKey: {
      type: String,
      default: '',
      require: true
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    title: '',
    description: '',
    categoryId: '',
    files: [],
    valid: true
  }),
  methods: {
    closeDialogHandler() {
      this.$emit('close-add-dialog')
    },
    onSubmitHandler() {}
  }
}
</script>
