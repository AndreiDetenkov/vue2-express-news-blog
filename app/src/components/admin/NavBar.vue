<template>
  <nav>
    <v-app-bar id="app-toolbar" app dark :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-app-bar-nav-icon @click.prevent="drawer = !drawer" />
      <v-toolbar-title>News admin panel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout" class="mx-2">
        <v-icon left>exit_to_app</v-icon>
        Logout
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      id="app-drawer"
      v-model="drawer"
      app
      dark
      width="220"
      :clipped="$vuetify.breakpoint.lgAndUp"
    >
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click.prevent="" text block>
            <v-icon left>exit_to_app</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    items: [
      { icon: 'dashboard', title: 'Dashboard', link: '/admin' },
      { icon: 'view_list', title: 'News', link: '' },
      { icon: 'category', title: 'Categories', link: '' },
      { icon: 'supervisor_account', title: 'Users', link: '' }
    ],
    drawer: null
  }),
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT')
    }
  }
}
</script>

<style lang="scss" scoped>
#app-drawer {
  .v-list-item {
    padding: 0 16px;
    margin-bottom: 8px;
  }
}
</style>
