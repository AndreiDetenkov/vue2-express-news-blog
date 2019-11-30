<template>
  <v-row justify="start" align="center" class="pr-12 pb-4">
    <h2 id="block-title" class="px-3">{{ title }}</h2>
    <v-divider />
  </v-row>
</template>

<script>
export default {
  name: 'BlockTitle',
  props: {
    title: {
      type: String,
      default: '',
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
#block-title {
  color: #505050;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
