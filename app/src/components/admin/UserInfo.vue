<template>
  <v-row justify="end" align="center">
    <v-icon dark large>mdi-account-circle</v-icon>
    <span class="title ml-2 d-inline-block">{{ user.username }}</span>
    <v-btn icon class="ml-2">
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
export default {
  name: 'UserInfo',
  created() {
    this.$store.dispatch('GET_USER_INFO')
  },
  computed: {
    user() {
      return this.$store.getters.getUserInfo
    }
  }
}
</script>
