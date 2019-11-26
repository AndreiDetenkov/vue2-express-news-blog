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
        <v-text-field
          v-model="title"
          label="Title"
          placeholder="Enter title of category"
          outlined
        />
        <v-select
          v-model="parentId"
          :items="parentCategories"
          item-text="title"
          item-value="id"
          label="Parent category"
          placeholder="Leave empty if you create parent category"
          outlined
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
    }
  },
  data: () => ({
    valid: false,
    title: '',
    parentId: null,
    loading: false
  }),
  created() {
    this.$store.dispatch('GET_PARENT_CATEGORIES')
  },
  destroyed() {
    this.title = ''
    this.parentId = ''
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
    },
    async submitHandler() {
      try {
        this.loading = true
        await this.$store.dispatch('CREATE_CATEGORY', {
          title: this.title,
          parentId: this.parentId
        })
        this.loading = false
        this.$emit('close-form')
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
}
</script>
