<template>
  <div v-if="!noActions" class="ActionRenderer__Buttons">
    <b-button-group>
      <b-button @click="onConfirm" v-if="!noConfirm && this.params.onConfirm">
        <font-awesome-icon :icon="['fas', 'check']" />
      </b-button>
      <b-button @click="onEdit" v-if="this.params.onEdit">
        <font-awesome-icon :icon="['fas', 'edit']" />
      </b-button>
      <b-button @click="onDelete" v-if="this.params.onDelete">
        <font-awesome-icon :icon="['fas', 'times']" />
      </b-button>
      <b-button @click="onClone" v-if="this.params.onClone">
        <font-awesome-icon :icon="['fas', 'copy']" />
      </b-button>
      <b-button @click="onInfo" v-if="this.params.onInfo">
        <font-awesome-icon :icon="['fas', 'info']" />
      </b-button>
      <b-button @click="onChat" v-if="this.params.onChat">
        <font-awesome-icon :icon="['fa', 'comments']" />
      </b-button>
      <b-button @click="onBan" v-if="this.params.onBan">
        <font-awesome-icon :icon="['fa', 'ban']" />
      </b-button>
      <b-button @click="onBlock" v-if="this.params.onBlock">
        <font-awesome-icon
          :icon="
            this.params.data && this.params.data.isActive
              ? ['fas', 'user-lock']
              : ['fas', 'lock-open']
          "
        />
      </b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICellRendererParams } from 'ag-grid-community'

interface Params extends ICellRendererParams {
  [key: string]: any
}

@Component
export default class AgGridField extends Vue {
  params!: Params
  noActions = false
  noConfirm = false

  created() {
    if (this.params.data) {
      if (this.params.data._noActions) {
        this.noActions = true
      }
      if (this.params.data._noConfirm) {
        this.noConfirm = true
      }
    }
  }

  onBlock() {
    this.params.onBlock(this.params)
  }

  onClone() {
    this.params.onClone(this.params)
  }

  onDelete() {
    this.params.onDelete(this.params)
  }

  onEdit() {
    this.params.onEdit(this.params)
  }

  onInfo() {
    this.params.onInfo(this.params)
  }

  onConfirm() {
    this.params.onConfirm(this.params)
  }

  onChat() {
    this.params.onChat(this.params)
  }

  onBan() {
    this.params.onBan(this.params)
  }
}
</script>

<style lang="scss" scoped>
.ActionRenderer__Buttons {
  display: flex;
  height: 40px;
  vertical-align: top;
  padding: 3px 0px;
}
</style>
