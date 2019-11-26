<template>
  <v-app-bar app dense flat>
    <v-app-bar-nav-icon />
    <v-toolbar-title>News</v-toolbar-title>
    <v-spacer />
    <v-btn text to="/auth">
      <v-icon left>exit_to_app</v-icon>
      Login
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar'
}
</script>
