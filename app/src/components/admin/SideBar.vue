<template>
  <v-navigation-drawer id="app-drawer" app dark permanent stateless>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title> </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
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
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    items: [
      { icon: 'home', title: 'Главная', link: '/admin' },
      { icon: 'view_list', title: 'Категории', link: '' },
      { icon: 'style', title: 'Товары', link: '' }
    ]
  })
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
