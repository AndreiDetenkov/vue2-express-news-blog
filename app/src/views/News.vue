<template>
  <v-content>
    <AppBar />
    <v-container>
      <p>news</p>
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
