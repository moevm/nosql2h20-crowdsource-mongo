<template>
  <div>
    <Auth/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Config from '@/config/config'

import Auth from "@/views/Auth.vue";

const Mapper = Vue.extend({
  computed: {}
})

@Component({
  components: {
    Auth
  }
})
export default class MainPage extends Mapper {
  async created() {
    console.log('created main')
    /*this.swiperComponentOption.slidesPerView =
        this.width < this.mobileWidth ? 1 : 3
      this.swiperComponentOption.slidesPerGroup =
        this.width < this.mobileWidth ? 1 : 3*/
  }
}
</script>

<style lang="scss" scoped>
</style>
