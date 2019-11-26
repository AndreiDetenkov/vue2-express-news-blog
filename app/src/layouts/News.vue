<template>
  <main>
    <Notification />
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'Main',
  components: { Notification: () => import('@/components/ui/Notification') }
}
</script>
