<template>
  <div class="text-center">
    <b-badge v-if="unReadCount" class="pl-3 pr-3 bg-primary text-white">
      {{ unReadCount }}
    </b-badge>
    <div v-if="isLoading">
      <font-awesome-icon :icon="['fa', 'spinner']" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICellRendererParams } from 'ag-grid-community'
import _ from 'lodash'

interface Params extends ICellRendererParams {
  [key: string]: any
}

@Component
export default class NewMessagesRenderer extends Vue {
  params!: Params
  private unReadCount!: number | null
  private isLoading = true

  private created() {
    this.isLoading = !(this.params && !_.isNil(this.params.value))

    this.unReadCount = this.isLoading ? null : this.params.value
  }
}
</script>
