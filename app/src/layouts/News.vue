<template>
  <v-content style="background: #fff;">
    <AppBar />
    <v-container>
      <router-view />
    </v-container>
  </v-content>
</template>

<script>
import AppBar from '../components/news/AppBar'
export default {
  name: 'Main',
  components: { AppBar }
}
</script>
