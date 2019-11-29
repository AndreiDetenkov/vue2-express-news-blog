<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card class="pa-2">
        <v-card-title class="pb-8">
          <v-row justify="space-between" no-gutters>
            <span class="headline font-weight-bold">{{ dialogTitle }}</span>
            <v-btn icon @click.stop="closeDialogHandler"><v-icon color="black">close</v-icon></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text class="text-center">
          <v-form ref="form" lazy-validation v-model="valid" @submit.prevent="onSubmitHandler">
            <v-select
              v-model="news.categoryId"
              :items="categories"
              :rules="[v => !!v || 'Categories is required']"
              item-text="title"
              item-value="id"
              label="Category"
              outlined
            />
            <v-text-field
              :rules="[v => !!v || 'Title is required']"
              outlined
              validate-on-blur
              label="Title"
              v-model="news.title"
            />
            <v-textarea
              :rules="[v => !!v || 'Title is required']"
              outlined
              validate-on-blur
              label="Description"
              v-model="news.description"
            />
            <v-file-input
              v-model="files"
              :rules="[v => !!v || 'Image is required']"
              label="Image"
              outlined
              dense
              show-size
              validate-on-blur
              prepend-icon="mdi-camera"
              accept="image/jpg, image/jpeg"
            />
            <v-row justify="center">
              <v-btn color="gray" large text @click.prevent="closeDialogHandler" class="px-6 mx-2">
                Cancel
              </v-btn>
              <v-btn color="primary" :loading="loading" large outlined class="px-6 mx-2" type="submit">
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
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    news: {
      title: '',
      description: '',
      categoryId: ''
    },
    files: [],
    enum: {
      ADD_NEWS: 'add_news',
      EDIT_NEWS: 'edit_news'
    },
    valid: true
  }),
  methods: {
    closeDialogHandler() {
      this.$emit('close-add-dialog')
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    onSubmitHandler() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        Object.keys(this.news).forEach(key => {
          formData.append(key, this.news[key])
        })
        formData.append('image', this.files)

        switch (this.dialogKey) {
          case this.enum.ADD_NEWS:
            this.$emit('add-news', formData)
            break
          case this.enum.EDIT_NEWS:
            this.$emit('edit-news', formData)
            break
        }
      }
    }
  }
}
</script>
