<template>
  <v-app-bar id="app-toolbar" app flat>
    <v-spacer></v-spacer>
    <!--    <v-btn icon class="mx-2">-->
    <!--      <v-icon>person</v-icon>-->
    <!--    </v-btn>-->
    <v-btn text @click="logout" class="mx-2">
      <v-icon left>exit_to_app</v-icon>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT')
    }
  }
}
</script>

<style lang="scss" scoped>
#app-toolbar {
  background: #e0e0e0;
  border-bottom: 1px solid #9e9e9e;
}
</style>
