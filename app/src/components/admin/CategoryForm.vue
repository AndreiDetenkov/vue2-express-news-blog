<template>
  <v-card color="#f9f9f9">
    <v-card-title class="pb-10">
      <span class="headline font-weight-bold">{{ cardTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="">
        <v-text-field
          v-model="title"
          label="Title"
          placeholder="Enter title of category"
          outlined
        />
        <v-select
          v-model="parentId"
          label="Parent category"
          placeholder="Leave empty if it is parent category"
          outlined
        />
        <v-btn color="primary">Create</v-btn>
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
    parentId: ''
  }),
  destroyed() {
    this.title = ''
    this.parentId = ''
  }
}
</script>
