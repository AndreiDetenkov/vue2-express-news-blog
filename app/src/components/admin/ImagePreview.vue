<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-btn icon dark @click.stop="closeHandler" class="close-btn">
          <v-icon lagre>close</v-icon>
        </v-btn>
        <v-img :src="`${url}uploads/${image}`" max-width="500" aspect-ratio="1.778" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ImagePreview',
  props: {
    dialog: {
      type: Boolean,
      default: false,
      require: true
    },
    image: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    url: axios.defaults.baseURL
  }),
  methods: {
    closeHandler() {
      this.$emit('close-image-preview-dialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  position: relative;
  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
}
</style>
