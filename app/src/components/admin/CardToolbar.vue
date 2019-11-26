<template>
  <v-toolbar style="background: #f9f9f9;" flat>
    <v-toolbar-title class="headline font-weight-bold">Categories</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn color="primary" text @click.prevent="clickHandler">
        <v-icon class="mr-2">add_box</v-icon>
        Create category
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'CardToolbar',
  methods: {
    clickHandler() {
      this.$emit('create-category')
    }
  }
}
</script>

<style scoped></style>
