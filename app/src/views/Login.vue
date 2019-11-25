<template>
  <v-col cols="12" xs="12" sm="7" md="5" lg="4" xl="3">
    <v-card class="elevation-10 pa-6" style="border-radius:8px;">
      <v-card-title class="pb-10">
        <v-row justify="center">
          <h3 class="headline text-uppercase font-weight-bold">Login form</h3>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation v-model="valid" @submit.prevent="onSubmit">
          <v-text-field
            outlined
            autofocus
            v-model="username"
            :rules="usernameRules"
            label="Username"
            prepend-inner-icon="person"
            type="text"
            validate-on-blur
            counter
            required
            class="mb-4"
          />
          <v-text-field
            outlined
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
            class="pb-8"
          />
          <v-btn color="accent" class="white--text" :disabled="!valid" large block type="submit">
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
    ]
  }),
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('LOGIN', { username: this.username, password: this.password })
      }
    }
  }
}
</script>
