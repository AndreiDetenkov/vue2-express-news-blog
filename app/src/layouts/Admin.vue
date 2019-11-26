<template>
  <v-content style="background:#e0e0e0;">
    <Notification />
    <NavBar />
    <v-container>
      <router-view />
    </v-container>
  </v-content>
</template>

<script>
import NavBar from '../components/admin/NavBar'
export default {
  name: 'Admin',
  components: { NavBar, Notification: () => import('@/components/ui/Notification') }
}
</script>
