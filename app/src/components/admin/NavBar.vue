<template>
  <nav>
    <v-app-bar id="app-toolbar" app dark :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-app-bar-nav-icon @click.prevent="drawer = !drawer" />
      <v-toolbar-title>News admin panel</v-toolbar-title>
      <v-spacer />
      <UserInfo />
    </v-app-bar>
    <v-navigation-drawer id="app-drawer" v-model="drawer" app dark width="220" :clipped="$vuetify.breakpoint.lgAndUp">
      <v-list>
        <v-list-item v-for="item in menu" :key="item.title" :to="item.link" :exact="item.exact">
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
          <v-btn @click.prevent="logout" color="grey darken-2" block>
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
  components: { UserInfo: () => import('@/components/admin/UserInfo') },
  data: () => ({
    items: [
      { icon: 'dashboard', title: 'Dashboard', link: '/admin', exact: true, role: 'user' },
      { icon: 'view_list', title: 'News', link: '/admin/news', role: 'user' },
      { icon: 'category', title: 'Categories', link: '/admin/categories' },
      { icon: 'supervisor_account', title: 'Users', link: '/admin/users' }
    ],
    drawer: null
  }),
  computed: {
    user() {
      return this.$store.getters.getUserInfo
    },
    menu() {
      return this.$store.getters.getMenu
    }
  },
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
