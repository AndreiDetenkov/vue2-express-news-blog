<template>
  <v-card color="#f9f9f9">
    <v-card-title class="pb-10">
      <v-row justify="space-between" no-gutters>
        <span class="headline font-weight-bold">{{ cardTitle }}</span>
        <v-btn icon @click.stop="closeHandler"><v-icon color="black">close</v-icon></v-btn>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitHandler">
        <v-text-field v-model="categoryTitle" label="Title" filled />
        <v-select
          v-model="parentId"
          :items="parentCategories"
          item-text="title"
          item-value="id"
          label="Parent category"
          filled
        />
        <v-btn color="primary" :loading="loading" class="mt-4" type="submit">{{ btnTitle }}</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CategoryForm',
  props: {
    cardTitle: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    valid: false,
    categoryTitle: '',
    parentId: null,
    id: '',
    loading: false
  }),
  watch: {
    item(val) {
      if (val && this.isEdit) {
        this.categoryTitle = val.title
        this.parentId = val.parentId
        this.id = val.id
      }
    }
  },
  computed: {
    btnTitle() {
      return this.cardTitle.split(' ').slice(0, 1)[0]
    },
    parentCategories() {
      return this.$store.getters.viewParentCategories
    }
  },
  methods: {
    closeHandler() {
      this.$emit('close-form')
      this.categoryTitle = ''
      this.parentId = null
      this.id = ''
    },
    async clickHandler(dispatchTitle) {
      try {
        this.loading = true
        await this.$store.dispatch(`${dispatchTitle}`, {
          id: this.id,
          title: this.categoryTitle,
          parentId: this.parentId
        })
        this.loading = false
        this.closeHandler()
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async submitHandler() {
      this.isEdit ? this.clickHandler('EDIT_CATEGORY') : this.clickHandler('CREATE_CATEGORY')
    }
  }
}
</script>
