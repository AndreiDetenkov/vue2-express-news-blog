<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card class="pa-2">
        <v-card-title class="pb-8">
          <v-row justify="space-between" no-gutters>
            <span class="headline font-weight-bold">{{ dialogTitle }}</span>
            <v-btn icon @click.stop="closeDialogHandler">
              <v-icon color="black">close</v-icon>
            </v-btn>
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
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    news: {
      title: '',
      description: '',
      categoryId: ''
    },
    files: [],
    enum: { ADD_NEWS: 'add_news', EDIT_NEWS: 'edit_news' },
    valid: true
  }),
  watch: {
    item(val) {
      if (val) {
        this.news.title = val.title
        this.news.description = val.description
        this.news.categoryId = val.categoryId
      }
    }
  },
  methods: {
    closeDialogHandler() {
      this.$emit('close-add-dialog')
      this.files = []
      this.$refs.form.resetValidation()
    },
    addNews() {
      const formData = new FormData()
      Object.keys(this.news).forEach(key => {
        formData.append(key, this.news[key])
      })
      formData.append('image', this.files)
      this.$emit('add-news', formData)
    },
    editNews() {
      const id = this.item.id
      const formData = new FormData()
      formData.append('title', this.news.title)
      formData.append('description', this.news.description)
      formData.append('categoryId', this.news.categoryId)
      formData.append('userId', this.item.userId)
      formData.append('date', this.item.noFormatDate)
      if (this.files.length !== 0) formData.append('image', this.files)
      this.$emit('edit-news', formData, id)
    },
    onSubmitHandler() {
      if (this.$refs.form.validate()) {
        switch (this.dialogKey) {
          case this.enum.ADD_NEWS:
            this.addNews()
            break
          case this.enum.EDIT_NEWS:
            this.editNews()
            break
        }
      }
    }
  }
}
</script>
