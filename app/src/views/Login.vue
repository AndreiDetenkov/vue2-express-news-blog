<template>
  <v-col cols="12" xs="12" sm="7" md="5" lg="4" xl="3">
    <v-card class="elevation-10 pa-3" style="border-radius:8px;">
      <v-card-title>
        <v-row justify="center">
          <span class="title">Вход в систему</span>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation v-model="valid" @submit.prevent="onSubmit">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            prepend-inner-icon="email"
            type="text"
            validate-on-blur
            required
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Пароль"
            prepend-inner-icon="lock"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            validate-on-blur
            counter
            required
            class="pb-8"
          />
          <v-btn color="accent" class="white--text" :disabled="!valid" block type="submit"
            >Войти</v-btn
          >
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
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'Необходимо ввести E-mail',
      v => /.+@.+\..+/.test(v) || 'Введите валидный E-mail'
    ],
    passwordRules: [
      v => !!v || 'Необходимо ввести пароль',
      v => (v && v.length >= 6) || 'Пароль должен быть не менее 6 символов'
    ]
  }),
  computed: {},
  methods: {
    onSubmit() {}
  }
}
</script>
