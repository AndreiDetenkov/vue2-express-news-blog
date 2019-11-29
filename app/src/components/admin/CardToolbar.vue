<template>
  <v-toolbar style="background: #f9f9f9;" flat>
    <v-toolbar-title class="headline font-weight-bold">{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn color="primary" text @click.prevent="clickHandler" v-if="btnTitle">
        <v-icon class="mr-2">add_box</v-icon>
        {{ btnTitle }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'CardToolbar',
  props: {
    title: {
      type: String,
      default: '',
      require: true
    },
    btnTitle: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickHandler() {
      switch (this.title) {
        case 'Categories':
          this.$emit('create-category')
          break
        case 'News':
          this.$emit('add-news')
          break
      }
    }
  }
}
</script>
