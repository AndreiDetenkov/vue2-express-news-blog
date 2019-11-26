<template>
  <v-content style="background:#e0e0e0;">
    <Notification />
    <NavBar />
    <SideBar />
    <router-view />
  </v-content>
</template>

<script>
import NavBar from '../components/admin/NavBar'
import SideBar from '../components/admin/SideBar'
export default {
  name: 'Admin',
  components: { NavBar, SideBar, Notification: () => import('@/components/ui/Notification') }
}
</script>
