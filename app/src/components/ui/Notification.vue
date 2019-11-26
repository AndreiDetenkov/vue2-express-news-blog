<template>
  <v-snackbar top v-model="snackbar" :color="color" :timeout="timeout">
    {{ text }}
    <v-btn text @click.prevent="closeSnackbar" class="text-capitalize">close</v-btn>
  </v-snackbar>
</template>
<script>
export default {
  name: 'Notification',
  data: () => ({
    timeout: 4000
  }),
  computed: {
    snackbar: {
      get() {
        return this.$store.state.notification.open
      },
      set() {
        this.$store.commit('NOTIFICATION', false)
      }
    },
    color() {
      return this.$store.state.notification.color
    },
    text() {
      return this.$store.state.notification.text
    }
  },
  methods: {
    closeSnackbar() {
      this.$store.dispatch('NOTIFICATION', { open: false, color: '', text: '' })
    }
  }
}
</script>
