<template>
  <div class="menu mt-3 mb-2">
    <b-navbar class="classMainLine" type="dark" variant="primary" sticky>
      <!--<b-button
          v-b-toggle.main-sidebar
          class="mr-2"
          variant="primary"
          pill
      >
        <font-awesome-icon :icon="['fas', 'bars']" />
      </b-button>-->
      <div @click="$router.push('/main')" class="mr-2 fa-2x navbarClass">
        <b>CrowdSource</b>
      </div>
      <b-navbar-brand href="#"> </b-navbar-brand>
      <b-button
        @click="$router.push('/main/work')"
        class="mr-2 btn-primary-outline"
      >
        Рабочая страница
      </b-button>
      <div class="registrationButton">
        <b-button
          @click="$router.push('/userlk')"
          class="mr-2 btn-primary-outline"
        >
          Иван
          <font-awesome-icon :icon="['fa', 'user-circle']" />
        </b-button>
      </div>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

const Mapper = Vue.extend({
  computed: {}
})

@Component({ components: {} })
export default class Navbar extends Mapper {
  private isCourir = true
}
</script>

<style>
.registrationButton {
  margin: 0 0 0 auto;
}
.menu {
  /*position: fixed;*/
  top: 0;
  width: 100%;
  z-index: 1000;
}
.navbarClass {
  cursor: pointer;
}
</style>
