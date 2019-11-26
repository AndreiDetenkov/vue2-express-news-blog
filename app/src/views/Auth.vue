<template>
  <v-col cols="12" xs="12" sm="7" md="5" lg="4" xl="3">
    <v-card class="elevation-10 pa-4" style="border-radius:25px;">
      <v-card-title class="pb-10">
        <v-row justify="center">
          <h3 class="headline text-uppercase font-weight-bold">
            {{ isRegister ? 'Signup' : 'Login' }}
          </h3>
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
          />
          <v-text-field
            v-if="isRegister"
            outlined
            rounded
            v-model="password2"
            :rules="passwordRules"
            label="Confirm Password"
            prepend-inner-icon="lock"
            :append-icon="show2 ? 'visibility' : 'visibility_off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            validate-on-blur
            counter
            required
            :error="error"
            :error-messages="errorText"
          />
          <v-btn
            color="accent"
            class="white--text mb-4 mt-6"
            :disabled="!valid"
            :loading="loading"
            large
            block
            rounded
            type="submit"
          >
            {{ isRegister ? 'Signup' : 'Login' }}
          </v-btn>
          <v-row justify="center" v-if="!isRegister">
            <span>Don't have an account?</span>
            <span class="register-link" @click.prevent="isRegister = true">
              Register
            </span>
          </v-row>
          <v-row justify="center" v-if="isRegister">
            <span>Have an account?</span>
            <span class="register-link" @click.prevent="isRegister = false">
              Login
            </span>
          </v-row>
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
    show2: false,
    valid: true,
    username: '',
    password: '',
    password2: '',
    usernameRules: [
      v => !!v || 'Username is required.',
      v => (v && v.length >= 4) || 'Username must be more than 4 characters.'
    ],
    passwordRules: [
      v => !!v || 'Password is required.',
      v => (v && v.length >= 6) || 'Password must be more than 6 characters.'
    ],
    loading: false,
    isRegister: false,
    error: null,
    errorText: ''
  }),
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate() && this.isRegister) {
        if (JSON.stringify(this.password) === JSON.stringify(this.password2)) {
          try {
            this.loading = true
            await this.$store.dispatch('SIGNUP', {
              username: this.username,
              password: this.password,
              password2: this.password2,
              role: 'user'
            })
            this.loading = false
            this.isRegister = false
            // eslint-disable-next-line no-empty
          } catch (e) {}
        } else {
          this.error = true
          this.errorText = 'Confirm password do not match'
        }
      } else {
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

<style scoped lang="scss">
.register-link {
  color: #039be5;
  font-weight: 700;
  margin-left: 4px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
