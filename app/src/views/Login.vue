<template>
  <v-col cols="12" xs="12" sm="7" md="5" lg="4" xl="3">
    <v-card class="elevation-10 pa-10" style="border-radius:25px;">
      <v-card-title class="pb-10">
        <v-row justify="center">
          <h3 class="headline text-uppercase font-weight-bold">Login</h3>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation v-model="valid" @submit.prevent="onSubmit">
          <v-text-field
            outlined
            rounded
            autofocus
            v-model="username"
            :rules="usernameRules"
            label="Username"
            prepend-inner-icon="person"
            type="text"
            validate-on-blur
            counter
            required
            class="mb-2"
          />
          <v-text-field
            outlined
            rounded
            v-model="password"
            :rules="passwordRules"
            label="Password"
            prepend-inner-icon="lock"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            validate-on-blur
            counter
            required
            class="pb-6"
          />
          <v-btn
            color="accent"
            class="white--text"
            :disabled="!valid"
            :loading="loading"
            large
            block
            rounded
            type="submit"
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    show: false,
    valid: true,
    username: '',
    password: '',
    usernameRules: [
      v => !!v || 'Username is required.',
      v => (v && v.length >= 4) || 'Username must be more than 4 characters.'
    ],
    passwordRules: [
      v => !!v || 'Password is required.',
      v => (v && v.length >= 6) || 'Password must be more than 6 characters.'
    ],
    loading: false
  }),
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          await this.$store.dispatch('LOGIN', { username: this.username, password: this.password })
          this.loading = false
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
    }
  }
}
</script>
