<template>
  <v-content style="background:#e0e0e0;">
    <Navbar />
    <Sidebar />
    <router-view />
  </v-content>
</template>

<script>
import Navbar from '../components/admin/Navbar'
import Sidebar from '../components/admin/Sidebar'
export default {
  name: 'Admin',
  components: { Navbar, Sidebar }
}
</script>
