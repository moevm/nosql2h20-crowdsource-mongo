<template>
  <div>
    <Auth />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Config from '@/config/config'

import Auth from '@/views/Auth.vue'

const Mapper = Vue.extend({
  computed: {}
})

@Component({
  components: {
    Auth
  }
})
export default class MainPage extends Mapper {}
</script>

<style lang="scss" scoped></style>
