<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card class="pa-2">
        <v-card-title class="pb-10">
          <span class="headline font-weight-bold">{{ title }}</span>
        </v-card-title>
        <v-card-text class="text-center">
          <v-form ref="form" lazy-validation v-model="valid" @submit.prevent="onSubmitHandler">
            <v-text-field
              outlined
              validate-on-blur
              counter
              label="Enter Username"
              v-model="username"
              :rules="usernameRules"
              v-if="this.dialogKey === this.enum.EDIT_USERNAME"
            />
            <v-text-field
              outlined
              validate-on-blur
              counter
              label="Enter Password"
              v-model="password"
              :rules="passwordRules"
              v-if="this.dialogKey === this.enum.EDIT_PASSWORD"
            />
            <v-row justify="center" class="pt-6">
              <v-btn color="gray" large text @click.prevent="closeDialogHandler" class="px-6 mx-2">
                Cancel
              </v-btn>
              <v-btn color="primary" large outlined class="px-6 mx-2" type="submit" :loading="loading">
                {{ title }}
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'UserDialog',
  props: {
    dialog: {
      type: Boolean,
      default: false,
      require: true
    },
    title: {
      type: String,
      default: '',
      require: true
    },
    dialogKey: {
      type: String,
      default: '',
      require: true
    },
    item: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valid: true,
    enum: { EDIT_USERNAME: 'edit_username', EDIT_PASSWORD: 'edit_password' },
    usernameRules: [
      v => !!v || 'Username is required.',
      v => (v && v.length >= 4) || 'Username must be more than 4 characters.'
    ],
    passwordRules: [
      v => !!v || 'Password is required.',
      v => (v && v.length >= 6) || 'Password must be more than 6 characters.'
    ],
    username: '',
    password: '',
    id: ''
  }),
  watch: {
    item(val) {
      if (val) {
        this.username = val.username
        this.id = val._id
      }
    }
  },
  methods: {
    closeDialogHandler() {
      this.$emit('close-user-dialog')
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    onSubmitHandler() {
      if (this.$refs.form.validate()) {
        switch (this.dialogKey) {
          case this.enum.EDIT_USERNAME:
            this.$emit('edit-username', this.id, this.username)
            break
          case this.enum.EDIT_PASSWORD:
            this.$emit('edit-password', this.password)
            break
        }
      }
    }
  }
}
</script>
